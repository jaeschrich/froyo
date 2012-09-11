var fs = require("fs");
var stream = require("stream").Stream;

desc("Main function");
task("default", function(){
var core = fs.createReadStream("froyo.core.js");
var staticjs = fs.createReadStream("froyo.static.js");
var main = fs.createWriteStream('./froyo.js');
core.pipe(main);
staticjs.pipe(main);
});