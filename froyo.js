/* 
Froyo.js, a micro-framework for node.js.

ALL OF THE FOLLOWING IS PUBLIC DOMAIN
*/

var http = require("http"); //Add the http module
var url = require("url");

function scoop(map, port){ // Deines the main function, scoop.
    if (typeof port === "undefined") { port = 8080; }
    http.createServer(function(req, res) {//creates the server
    var path = url.parse(req.url).pathname;
    console.log(req.method+" request recieved for "+path);
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
    }
    }).listen(port); //Listens at the port specified
    console.log("Server Started at port "+ port);//More cmd sugar text
}

exports.scoop = scoop;//Exports the function for use
