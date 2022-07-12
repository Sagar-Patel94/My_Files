const ffmpeg = require("fluent-ffmpeg");

ffmpeg({ source: "./bulbul.mp4" })
  .on("filenames", (filenames) => {
    console.log("Created file names", filenames);
  })
  .on("end", () => {
    console.log("Job done");
  })
  .on("error", (err) => {
    console.log(err);
  })
  .takeScreenshots(
    {
      filename: "example.jpg",
      timemarks: [26.5],
    },
    "."
  );
