var fs = require("fs");

exports.staticHandler = function(file, encoding){
    return function(req, res){
        res.writeHead(200, {"Content-Type": encoding});
        var fstream = fs.createReadStream(file);
        fstream.pipe(res);
    };
};