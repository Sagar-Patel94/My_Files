const { RemoveBgResult, RemoveBgError, removeBackgroundFromImageFile } =  require('remove.bg');
 
const localFile = "Capture.JPG";
const outputFile = `${__dirname}/removedBg.png`;
 
removeBackgroundFromImageFile({
  path: localFile,
  apiKey: "RE5DSP6cfsNbDKEEzx2n3yV1",
  size: "regular",
  type: "auto",
  scale: "50%",
  outputFile 
}).then((result) => {
 console.log(`File saved to ${outputFile}`);
  const base64img = result.base64img;
}).catch((errors) => {
 console.log(JSON.stringify(errors));
});