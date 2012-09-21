//A nodejs micro framework. It auto-detects if it is a node cluster worker and adjusts for that.
//
//##Install
//
//###With npm:
//<code>
// npm install froyo
//</code>
//
//###Build from source:
//Needs Jake
//
//<code>
//git clone git://github.com/PyScripter255/frozen-yogurt.git<br>
//cd frozen-yogurt<br>
//jake<br>
//</code>
//


/* 
Froyo.js, a micro-framework for node.js.

ALL OF THE FOLLOWING IS PUBLIC DOMAIN
*/

var http = require("http");
var url = require("url");
var cluster = require("cluster");
//##froyo.scoop
//
//Takes a map variable and a port variable
//###Map
//<code>map</code> is an Javascript Object Literal argument passed to froyo.scoop.<br> In it, you set a url (a string) to a request handler (a function that accepts request and response).<br>
//<code>
//function main(req, res){<br>
//res.writeHead(200, {"Content-Type": "text/html"})<br>
//res.write("Hello World!")<br>
//res.end()<br>
//}
//
//var map = {<br>
//"/": main,<br>
//'/whatever': whateverFunction,<br>
//'404': four\_o\_four // You can set an optional 404 handler to replace the built-in one<br>
//}
//</code>
//
//###Port
//Port is a number that defaults to 8080
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
