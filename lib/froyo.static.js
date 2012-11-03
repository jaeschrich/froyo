"use strict";
var fs = require("fs"),
Stream = require("stream").Stream,
mustache = require("mustache");

var _templates = {};

function mc(res, opts){
var mc = new Stream();

    mc.write = function (chunk) {
        mc.emit("data", mustache.render(chunk.toString(), opts));
    }
	mc.end = function(){
	    res.end()
	}
	mc.writable = true;  
    return mc;  
}

exports.addTemplate = function (name, fn) {
    _templates[name] = fn;
};

exports.getTemplate = function (name) {
    return _templates[name];
};


exports.addTemplate("mustache", function (file, res, opts) {
    res.writeHead(200, {"Content-Type": "text/html"})
    var m = mc(res, opts);
    var fStream = fs.createReadStream(file);
    fStream.pipe(m);
    m.pipe(res);
<<<<<<< HEAD
};

exports.addTemplate = function (name, fn) {
    exports[name] = fn;
};
=======
});
>>>>>>> master
