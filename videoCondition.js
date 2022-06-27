(function () {
  var ffmpeg = require("fluent-ffmpeg");
  const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

  ffmpeg.setFfmpegPath(ffmpegPath);

  var args = process.argv.slice(2);

  let play = true;

  args.forEach(function (val, index, array) {
    ffmpeg.ffprobe(val, (err, metaData) => {
      const { duration } = metaData.format;
      console.log("Total time of video :- " + duration);

      if (play == true) {
        console.log("Video is playing");
        ffmpeg()
          .input(val)
          .output("play.mp4")
          .on("progress", function (progres) {
            console.log("... frames :- " + progres.frames);
          })
          .on("end", () => console.log("Done!"))
          .on("error", (err) => console.error(err))
          .run();
      } else {
        console.log("Video not play without permission");
      }
    });
  });
})();
