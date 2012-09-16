var fs = require("fs");
var stream = require("stream").Stream;
var spawn = require("child_process").spawn

desc("Main task");
task("default", function(){
var core = fs.createReadStream("froyo.core.js");
var staticjs = fs.createReadStream("froyo.static.js");
var main = fs.createWriteStream('./froyo.js');
core.pipe(main);
staticjs.pipe(main);
console.log("froyo.js written");
});

desc("Build the documentation")
task("docs", ['default'], function(){
spawn("docco", ["froyo.js"]);
});
