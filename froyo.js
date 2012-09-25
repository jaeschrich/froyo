var http = require("http");
var url = require("url");
var cluster = require("cluster")
function scoop(map, port){
    var prefix = "Server: ";
    if (cluster.isWorker){
        prefix = "Worker "+cluster.worker.workerID+": ";
    }
   if (typeof port === "undefined") { port = 8080; }
    http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname; 
    console.log(prefix+req.method+" request recieved for "+path); 
    handled = false;
    for (var s in map){
    var pat = RegExp(s)
    if (pat.test(path) === true){
	    var params = s.match(pat)
	    delete params[0]
	    req.params = params
	    map[s](req, res)
	    handled = true;
    }
    }
    if (!handled){
    try {
    map['404'](req, res)
    }
    catch(e){
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end("404: Not found")
    }
    }
    console.log(prefix+"got 404 error for "+path);
    }).listen(port);
    console.log(prefix+"serving at port "+ port);
    return true
 }
exports.scoop = scoop;
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

