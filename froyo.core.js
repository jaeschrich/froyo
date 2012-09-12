/* 
Froyo.js, a micro-framework for node.js.

ALL OF THE FOLLOWING IS PUBLIC DOMAIN
*/

var http = require("http"); //Add the http module
var url = require("url");//Add the url module

function scoop(map, port){ // Deines the main function, scoop.
    if (typeof port === "undefined") { port = 8080; }
    http.createServer(function(req, res) {//creates the server
    var path = url.parse(req.url).pathname; // Defines the path
    console.log(req.method+" request recieved for "+path); //Cmd sugar
    try { //Trys to route the request
        map[path](req, res);
    }
    catch (e){
        try {
            map['404'](req, res); //Tries to use the user defined 404 function
        }
        catch(e){
            res.writeHead(200, {"Content-Type": 'text/html'}); //Built-in 404
            res.end("404: Not Found");
        }
        console.log("404 error for "+path) // console.log the 404 error
    console.log("404 error for "+path);
    }
    }).listen(port); //Listens at the port specified
    console.log("Server Started at port "+ port);//More cmd sugar text
}

exports.scoop = scoop;//Exports the function for use
