var assert = require("assert");
var froyo = require("../froyo")
var Stream = require("stream").Stream;

describe("froyo.core", function(){
	describe("#scoop", function(){
		it("should start an http server", function(){
			assert.equal(true, froyo.scoop())
		})
	})
	describe("#staticHandler", function(){
		it("should return a function", function(){
			var a = new Stream();
			a.writeHead = function(){}
			a.writable = true;
			a.write = function(c){
			assert.equal(c, "<!DOCTYPE html><html><body>Hi</body></html>")
			}
			a.end = function(){}
			var b = froyo.staticHandler("test/test.jade", "text/jade", {"test": "Hi"})
			b("", a)
		})
	})
})
