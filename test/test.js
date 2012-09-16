var assert = require("assert");
var froyo = require("../froyo")

describe("froyo.core", function(){
	describe("#scoop", function(){
		it("should start an http server", function(){
			assert.equal(true, froyo.scoop())
		})
	})
	describe("#staticHandler", function(){
		it("should return a function", function(){
			assert.ok(froyo.staticHandler('./foo.bar', "text/bar"))
		})
	})
})
