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
      ffmpeg()
        .input(val)
        .input("removedBg.png")
        .complexFilter([
          "[0:v]scale=1080:-1[bg];[bg][1:v]overlay=W-w-100:H-h-500:enable='between(t,3,10)",
        ])
        .videoCodec("libx264")
        // .outputOptions("-pix_fmt yuv420p")
        .output(basename + "AddImage.mp4")
        .on("progress", function (progres) {
          console.log("... frames :- " + progres.frames);
        })
        .on("end", () => console.log("Done!"))
        .on("error", (err) => console.error(err))
        .run();
    });
  });
})();