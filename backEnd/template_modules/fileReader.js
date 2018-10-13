const fs = require("fs"); 
const {config} = require('../tube.js');
const path = require('path');


function fileReader(pathName, callback){
		// console.log("**********fileReader work*********");
	fs.readFile(pathName,  (err, data) => {
  	if (err) {
  		fs.readFile('../../frontEnd/404.html', (err, data) => {
  			return callback(data);
  		})
  	};
		return callback(null, data);
	});
}

module.exports = fileReader;