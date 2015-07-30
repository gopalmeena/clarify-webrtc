'use strict';

var Record = require('../models/record');
var Call = require('../models/call');
var clarify = require('clarifyio');
var config = require('../config');
var clarifyClient = new clarify.Client('api.clarify.io', config.clarify.API_KEY);
var _ = require('lodash');
var fs = require('fs');

var handleData = function (data) {
    return data.replace(/^data:audio\/ogg; codecs=opus;base64,/, '');
};

var gatherHits = function (itemResult, terms) {
    var hits = [];
    (itemResult.term_results || []).forEach(function (tr, i) {
        var term = terms[i] || '';
        var matches = tr.matches || [];
        matches.forEach(function (m) {
            if (m.type === 'audio') {
                m.hits.forEach(function (h) {
                    h.term = term;
                    hits.push(h);
                });
            }
        });
    });
    return hits;
};

exports.create = function (req, res) {
    Call.findById(req.body.call, function (err, call) {
        Record.create({
            call: call,
            user: req.user
        }, function (err, record) {
            call.records.push(record);
            call.save();
            fs.writeFile('./public/uploads/' + record._id + '.ogg', '', 'base64');
            res.status(200).json({id: record._id});
        });
    });
};

exports.update = function (req, res) {
    var data = handleData(req.body.data);
    fs.appendFile('./public/uploads/' + req.params.id + '.ogg', data, 'base64');
    res.status(200).json({id: req.params.id});
};

exports.finish = function (req, res) {
    Record.findById(req.params.id)
        .exec(function (err, record) {
            var metadata = {
                recordId: record._id
            };
            clarifyClient.createBundle({
                name: 'Test',
                media_url: config.BASE_URL + '/uploads/' + record._id + '.ogg',
                notify_url: config.BASE_URL + '/records/notify',
                external_id: record._id.toString(),
                metadata: JSON.stringify(metadata)
            }, function(err){
                console.log(err);
            });
            res.sendStatus(200);
        });
};

exports.notify = function (req, res) {
    var io = req.app.get('io');
    console.log(req);
    if ('bundle_processing_cost' in req.body) {
        Record.findById(req.body.external_id, function (err, record) {
            if (record) {
                record.processing_cost = req.body.bundle_processing_cost;
            }
        });
    }

    if (req.body.track_id) {
        var trackData = req.body._embedded['clarify:track'];
        Record.findById(req.body.external_id, function (err, record) {
            if (record) {
                record.clarify.bundle_id = req.body.bundle_id;
                record.clarify.indexedAt = Date.now();
                record.clarify.duration = trackData.duration;
            }
        });
    }
    res.sendStatus(200);
};

exports.search = function (req, res) {
    var query = req.body.query;
    var searchResult = {
        results: []
    };

    clarifyClient.search({query: query, embed: 'metadata'}, function (err, result) {
        var terms = (result.search_terms || []).map(function (t) {
            return t.term;
        });
        var count = Math.min(result.total, result.limit);

        var ids = [];
        if (count > 0) {
            ids = result._embedded.items.map(function (item) {
                return item._embedded['clarify:metadata'].data.recordId;
            });
        }

        Record.find({'_id': {'$in': ids}, user: req.user}, function (err, data) {
            var records = _.transform(data, function (trecords, item) {
                trecords[item.id] = item;
            });

            for (var i = 0; i < count; i++) {
                var metadata = result._embedded.items[i]._embedded['clarify:metadata'].data;
                var itemResult = result.item_results[i];
                var media = records[metadata.recordId];
                if (media) {
                    var item = {
                        id: media._id,
                        mediaUrl: media.url,
                        name: media.name,
                        score: itemResult.score,
                        hits: gatherHits(itemResult, terms),
                        duration: media.duration,
                        searchTermResults: itemResult.term_results
                    };
                    searchResult.results.push(item);
                }
            }
            res.status(200).json(searchResult);
        });
    });
};

