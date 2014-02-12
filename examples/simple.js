var path = require("path");
var ftpd = require("../index.js");

ftpd.createServer({
    sandbox: path.join(__dirname, "sandbox")
}).listen(2121, function () {
    console.log("Server started");
});