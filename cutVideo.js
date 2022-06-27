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

    ffmpeg.ffprobe(val, (err, metaData) => {
      // const { duration } = metaData.format;
      const startingTime = 15;
      const clipDuration = 8;

      ffmpeg()
        .input(val)
        .inputOptions([`-ss ${startingTime}`])
        .outputOptions([`-t ${clipDuration}`])
        // .noAudio()
        .output(basename + "Cut.mp4")
        .on("progress", function (progres) {
          console.log("... frames :- " + progres.frames);
        })
        .on("end", () => console.log("Done!"))
        .on("error", (err) => console.error(err))
        .run();
    });
  });
})();
