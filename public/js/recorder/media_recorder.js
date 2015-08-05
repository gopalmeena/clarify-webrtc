(function(window){
  var webkitMediaRecorder = function(stream){
    var context = new AudioContext();
    var source = context.createMediaStreamSource(stream);
    var self = this;
    var recorder = new Recorder(source);
    recorder.ondataavailable = function(e){
      self.ondataavailable(e);
    };

    this.start = function(interval) {
      recorder.record();
    };

    this.stop = function() {
      recorder.stop();
    };

    this.ondataavailable = function(e) {}
  };

  window.webkitMediaRecorder = webkitMediaRecorder;
})(window);