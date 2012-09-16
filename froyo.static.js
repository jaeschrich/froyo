var fs = require("fs");
//##froyo.staticHandler
//
//Takes two arguments, a file path and the MIME type encoding
//It returns a stream based function that serves the file
//
//###Example
//<code>
//var map = {<br>
//'/': froyo.staticHandler("index.html", "text/html")<br>
//}<br>
//</code>
exports.staticHandler = function(file, encoding){
    return function(req, res){ 
        res.writeHead(200, {"Content-Type": encoding});
        var fstream = fs.createReadStream(file);
	fstream.on("error", function(err){
		fstream.emit("File error. Our bad!")
		fstream.end()
	})
        fstream.pipe(res);
    };
};
