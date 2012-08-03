/* 
Froyo.js, a micro-framework for node.js.

ALL OF THE FOLLOWING IS PUBLIC DOMAIN
*/

var http = require("http") //Add the http module

function scoop(map, port){ // Deines the main function, scoop.
    if (typeof port === "undefined") { port = 8080; }
    var a = false //Sets the a switch
    var keys = Object.keys(map) // Creates a list of keys
    http.createServer(function(req, res) {//creates the server
        console.log("Request recieved for "+req.url)// Adds helpful coommand-line output
        var i = 1 //Sets the i switch
        while(i <= keys.length) { // Starts the while loop for request handling. Iterates through each key in map
            var k = keys[i - 1] // Sets the k variable, just short for whatever path we are on
            if (req.url === k){// Awesome part! Checks if path request and the path given match
                console.log("Routing request for "+req.url)// More useful cmd stuff
                map[k](req, res);//Calls the request handler, passing request and response
                a = true// Sets a to true, (flips switch a)
                break; // Breaks out of the while loop            
                                }
                             i++; // increases the i switch if the above if statement evaluates to false               
        }

            if(a === true) {// This will always answer with a 404, but fails if another response has already been sent
                res.writeHead(404, {"Content-Type": 'text/html'})
                res.end("<!doctype html>\n<html>\n<body>\n404: Not Found. Sorry :(\n</body>\n</html>")// Sends a 404 msg

            }
    }).listen(port) //Listens at the port specified
    console.log("Server Started at port "+ port)//More cmd sugar text
}

exports.scoop = scoop//Exports the function for use
