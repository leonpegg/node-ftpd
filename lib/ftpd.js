var util = require('util');
var fs = require("fs");
var net = require('net');

var messages = require("./messages.js");
var commands = require("./commands.js");
var vfs = require("./vfs.js");

function connectionListener(socket) {
    var self = this;
    console.log(socket.remoteAddress, "Client connected");
    socket.setTimeout(0); // We want to handle timeouts ourselves
    socket.setEncoding("ascii"); // force data String not Buffer, so can parse FTP commands as a string
    socket.setNoDelay();
    socket.passive = false;
    socket.data = {
        host: null,
        port: 2122,
        listener: null,
        socket: null
    };
    socket.type = "ascii";
    socket.mode = "stream";
    socket.sandbox = self.sandbox;
    socket.vfs = new vfs();

    socket.reply = function (status, message, callback) {
        if (!message) message = messages[status] || 'No information'
        if (this.writable) {
            console.log(this.remoteAddress, "<-", status, message.toString());
            this.write(status.toString() + ' ' + message.toString() + '\r\n', callback)
        }
    };

    socket.addListener("data", function (data) {
        var parts = data.toString().trim().split(" "),
            command = parts[0].trim().toUpperCase(),
            args = parts.slice(1, parts.length),
            callable = commands[command]
        console.log(socket.remoteAddress, "->", command, args);
        if (!callable) {
            this.reply(502)
        } else {
            callable.apply(socket, args)
        }
    });

    socket.reply(220);
};

function Server(options) {
    if (!(this instanceof Server)) return new Server();
    net.Server.call(this, {
        allowHalfOpen: false
    });
    this.sandbox = options.sandbox;
    this.addListener('connection', connectionListener);

    this.addListener('clientError', function (error, connection) {
        connection.destroy(error);
    });

    this.timeout = 0;
}
util.inherits(Server, net.Server);

exports.createServer = function (options) {
    if (typeof options !== "object")
        options = {};
    if (typeof options.sandbox !== "string")
        throw new Error();
    var stats = fs.lstatSync(options.sandbox);
    if (!stats.isDirectory())
        throw new Error();
    return new Server(options);
};