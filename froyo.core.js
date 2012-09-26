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
	     try {
	        map[path](req, res);
	        }
	     catch (e){
	        try {
                  map['404'](req, res);
                }
                catch(e){
	          res.writeHead(200, {"Content-Type": 'text/html'});
	          res.end("404: Not Found");
	        }
	        console.log(prefix+"got 404 error for "+path);
	     }
	    }).listen(port);
	   console.log(prefix+"serving at port "+ port);
	   return true
	 }
exports.scoop = scoop;
