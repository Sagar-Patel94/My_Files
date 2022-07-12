(function () {
  var ffmpeg = require("fluent-ffmpeg");
  const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

  ffmpeg.setFfmpegPath(ffmpegPath);

  var args = process.argv.slice(2);

  args.forEach(function (val, index, array) {
    ffmpeg.ffprobe(val, (err, metaData) => {
      console.log("inside addSubtitles");
      ffmpeg(val)
        .videoCodec('libx264')
        .audioCodec('libmp3lame')
        .outputOptions(
            '-vf subtitles=./subtitles.srt'
        )
        .on("progress", function (progres) {
          console.log("... frames :- " + progres.frames);
        })
        .on('error', function(err) {
            callback(true, err)
        })
        .save('./bulbulSubtitle.mp4')
        .on('end', function() {
            console.log("Done!")
        })
    });
  });
})();
