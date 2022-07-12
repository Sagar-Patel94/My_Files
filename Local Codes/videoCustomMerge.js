(function () {
  var ffmpeg = require("fluent-ffmpeg");
  const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

  ffmpeg.setFfmpegPath(ffmpegPath);

  var args = process.argv.slice(2);

  args.forEach(function (val, index, array) {
    ffmpeg.ffprobe(val, (err, metaData) => {
      const startingTime = 1;
      const clipDuration = 10;
      
      const startingTime1 = 21;
      const clipDuration1 = 39;

      ffmpeg()
        .input(val)
        .inputOptions([`-ss ${startingTime}`])
        .outputOptions([`-t ${clipDuration}`])
        .output("temp1.mp4")
        .on("progress", function (progres) {
          console.log("... frames :- " + progres.frames);
        })
        .on("end", () => console.log("Done!"))
        .on("error", (err) => console.error(err))
        .run();

      ffmpeg()
        .input(val)
        .inputOptions([`-ss ${startingTime1}`])
        .outputOptions([`-t ${clipDuration1}`])
        .output("temp2.mp4")
        .on("progress", function (progres) {
          console.log("... frames :- " + progres.frames);
        })
        .on("end", () => console.log("Done!"))
        .on("error", (err) => console.error(err))
        .run();

      ffmpeg()
        .input("./temp1.mp4")
        .input("./temp2.mp4")
        .mergeToFile("merge.mp4")
        .on("progress", function (progres) {
          console.log("... frames :- " + progres.frames);
        })
        .on("end", () => console.log("Done!"))
        .on("error", (err) => console.error(err))
        .run();
    });
  });
})();

// var ffmpeg = require('fluent-ffmpeg');

// var command = ffmpeg()
//   .input('./bulbul.mp4')
//   .setStartTime('00:00:03')
//   .setDuration('10')
//   .output('./videos/test.mp4')

//   .on('start', function(commandLine) {
//     console.log('Started: ' + commandLine);
//   })

//   .on('end', function(err) {
//     if(!err)
//     {
//       console.log('conversion Done');
//     }
//   })

//   .on('error', function(err){
//     console.log('error: ', err);
//   }).run();
