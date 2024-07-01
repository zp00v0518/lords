import fs from "node:fs";

function fileReader(pathName, callback) {
  fs.readFile(pathName, (err, data) => {
    if (err) {
      fs.readFile("../../frontEnd/404.html", (err, data) => {
        return callback(data);
      });
    }
    return callback(null, data);
  });
}

export default fileReader;
