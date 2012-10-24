var fs = require("fs");
var stream = require("stream").Stream;
var spawn = require("child_process").spawn

desc("Installs froyo.js");
task("install", function(){
    jake.exec([
        "npm install"
        ],
        function(){
            console.log("Installed froyo")
            complete()
    })
});

desc("Install dev dependecies")
task("deps", function () {
    jake.exec([
        "npm install -g mocha",
        "npm install jade",
        "npm install rewire",
        "npm install mustache",
        "npm install connect",
        "npm install supertest",
        "npm install routes"
        ],
        function () {
            console.log("Installed mocha, jade, rewire, mustache, supertest, and connect")
            complete()
        })
});

/*
 * Does anyone know how to get the full (and hopefully color-coded) output of mocha here?
*/
desc("Runs unit tests")
task("test", function () {
    jake.exec(["mocha --reporter spec"], function () {
        complete()
    }, { printStdout: true, printStderr: true })
});