Frozen Yogurt(froyo.js) is a micro-framework for node.js that I created in a few hours. It's small enough that people probably could memorize and retype the file. It is public domain, no restrictions. Nodejs is licensed with the MIT license

Usage:

So, to use froyo.js, you need to

1. require the module var froyo = require("./path/to/froyo")

2. Define your request handlers as functions. The functions must have only 2 arguments request and response:

function main(req, res){
res.writeHead(200, {"Content-Type": "text/html"})
res.write("Hello World!")
res.end()
}

3. Define your url mapping as a JSON variable

var map = {
"/": main,
'/whatever': whateverFunction
}

4. Pass the map variable to the function froyo.scoop()

froyo.scoop(map, optionalPortVariable)

5. Enjoy!
