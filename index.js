/* Just a simple demo on how to use froyo.js 

ALL OF THE FOLLOWING  IS PUBLIC DOMAIN
*/

var froyo = require('./froyo')

function main(req, res){ // A requets handler
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end("<!doctype html>\n<html>\n<body>\nHello World\n</body>\n</html>")
}

function test(req, res){//Another request handler
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end("<!doctype html>\n<html>\n<body>\nTesting, Testing\n</body>\n</html>")
}


var map = {//The JSON object that stores the url mapping
    "/": main,
    '/test': test
}

froyo.scoop(map, 8080)// Starts the server at port 8080
