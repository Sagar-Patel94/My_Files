(function () {
  var ffmpeg = require("fluent-ffmpeg");
  const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

  ffmpeg.setFfmpegPath(ffmpegPath);

  var args = process.argv.slice(2);

  function baseName(str) {
    var base = new String(str).substring(str.lastIndexOf("/") + 1);
    if (base.lastIndexOf(".") != -1) {
      base = base.substring(0, base.lastIndexOf("."));
    }
    return base;
  }

  args.forEach(function (val, index, array) {
    var filename = val;
    var basename = baseName(filename);

    ffmpeg(val)
      .output(basename + "-1920x1080.mp4")
      .videoCodec("libx264")
      // .noAudio()
      .size("300x300")

      .on("error", function (err) {
        console.log("An error occured :- " + err);
      })
      .on("progress", function (progres) {
        console.log("... frames :- " + progres.frames);
      })
      .on("end", function () {
        console.log("Finished processing");
      })
      .run();
  });
})();
