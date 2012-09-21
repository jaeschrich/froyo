var fs = require("fs");
//##froyo.staticHandler
//
//Takes two arguments, a file path and the MIME type encoding
//It returns a stream based function that serves the file
//If you set the MIME type to ```text/jade``` then it will compile it with jade
//###Example
//<code>
//var map = {<br>
//'/': froyo.staticHandler("index.html", "text/html")<br>
//}<br>
//</code>
exports.staticHandler = function(file, encoding, config){
    return function(req, res){ 
        var fstream = fs.createReadStream(file);
	fstream.on("error", function(err){
		fstream.emit("data", "File error. Our bad!")
	})
	if (encoding === "text/jade"){
	var jade = require("jade")
	var Stream = require("stream").Stream
	
	var jadeStream = new Stream();

	jadeStream.write = function(chunk){
	jadeStream.emit("data", jade.compile(chunk)(config))
	}
	jadeStream.end = function(){

	}
	jadeStream.writable = true;
	fstream.pipe(jadeStream);
	res.writeHead(200, {"Content-type": "text/html"})
	jadeStream.pipe(res)
	}
	else {
	res.writeHead(200, {"Content-Type": encoding})
	fstream.pipe(res)
	}
    };
};
