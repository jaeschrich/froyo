/* Just a simple demo on how to use froyo.js 

ALL OF THE FOLLOWING  IS PUBLIC DOMAIN
*/
function extend(dest, props){
    for (var prop in props){
        dest[prop] = props[prop];
    }
}

var froyo = require("./froyo.core");
extend(froyo, require('./froyo.static'));
var qs = require("querystring");
var url = require("url");

var main = function(req, res){
        res.writeHead(200, {"Content-Type": 'text/html'});
        res.end("<html><body><form action='/test'>Enter your name<input type='text' name='name'/>"+
        "<br><button type='submit'>Submit</button></form><body></html>");
    };
var test = function(req, res){
    res.writeHead(200, {"Content-Type": 'text/html'});
    res.end("Hello "+qs.parse(url.parse(req.url).query).name);
};

function four_o_four(req, res){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("404");
}

var map = {//The JSON object that stores the url mapping
    "/": main,
    '/test': test,
    '404': four_o_four, 
    '/package.json': froyo.staticHandler("package.json", "text/json")
};

froyo.scoop(map, 8080);// Starts the server at port 8080
