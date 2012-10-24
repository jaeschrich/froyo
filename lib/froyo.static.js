"use strict";
var fs = require("fs"),
utils = require("./froyo.utils"),
Stream = require("stream").Stream,
mustache = require("mustache");

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

exports.mustache = function (file, res, opts) {
    res.writeHead(200, {"Content-Type": "text/html"})
    var m = mc(res, opts);
    var fStream = fs.createReadStream(file);
    fStream.pipe(m);
    m.pipe(res);
};

exports.addTemplate = function (name, fn) {
    exports[name] = fn;
};