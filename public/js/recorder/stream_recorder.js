(function(window){
  var StreamRecorder = function(stream){
    var context = new AudioContext();
    var source = context.createMediaStreamSource(stream);
    var updateInterval = 5000;
    var recording = false;
    var self = this;

    function loop() {
      var recorder = new Recorder(source);
      recorder.record();
      recorder.ondataavailable = function(e){
        self.ondataavailable(e);
        if (recording) {
          loop();
        }
      };
      setTimeout(function(){
        recorder.stop();
      }, updateInterval);
    }

    this.start = function(interval) {
      recording = true;
      updateInterval = interval;
      loop();
    };

    this.stop = function() {
      recording = false;
    };

    this.ondataavailable = function(e) {
    }
  };

  window.StreamRecorder = StreamRecorder;
})(window);