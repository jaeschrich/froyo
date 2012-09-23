var fs = require("fs");
var stream = require("stream").Stream;
var spawn = require("child_process").spawn

desc("Builds froyo.js");
task("build", function(){
var core = fs.createReadStream("froyo.core.js");
var staticjs = fs.createReadStream("froyo.static.js");
var main = fs.createWriteStream('./froyo.js');
core.pipe(main);
staticjs.pipe(main);
console.log("froyo.js written");
});

desc("Install dev dependecies")
task("default", function(){
spawn("npm", ['install', 'mocha', 'jade', 'github-flavored-markdown'])
})
desc("Build the documentation")
task("docs", [], function(){
var gfm = require("github-flavored-markdown")
fs.readdir("./docs", function(err, files){
if (err) throw new Error(err)
for (var file in files){
if(files[file].match(/.*\.(.*)/)[1] === "md"){
fs.readFile("docs/"+files[file], function(err, data){
if (err) throw new Error(err)
fs.writeFile("./docs/index.html", "<!DOCTYPE html><html><head><link rel=\"main.css\" /><script src=\"prettify.js\"></script><link rel=\"prettify.css\" /><body onload=\"prettify()\">"+gfm.parse(data.toString()).replace(/<pre lang=\".*\">/g, "<pre class=\"prettify\">"))
})
}
}
})
})
