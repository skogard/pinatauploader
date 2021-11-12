const fs = require("fs");
const FormData = require("form-data");
const rfs = require("recursive-fs");
const basePathConverter = require("base-path-converter");
const got = require('got');
const jwt = "<YOUR PINATA JWT HERE>"
const pinDirectoryToPinata = async () => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const src = "ipfs"
  var status = 0;
  let percent = 0;
  console.time("upload")
  try {
    const { dirs, files } = await rfs.read(src);
    let data = new FormData();
    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }    
    const response = await got(url, {
      method: 'POST',
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        "Authorization": jwt
      },
      body: data
    })		
    .on('uploadProgress', progress => {
      if (progress.percent > percent+0.01) {
        percent+=0.01;
        console.log("progress", percent)
      }
    });
    console.timeEnd("upload")
    console.log(JSON.parse(response.body));
  } catch (error) {
    console.log(error);
  }
};
pinDirectoryToPinata().then(() => {
  console.log("done")
  process.exit()
})
