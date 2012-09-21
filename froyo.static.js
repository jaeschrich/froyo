var fs = require("fs");

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
	res.end()
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

