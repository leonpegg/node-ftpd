var fs = require("fs");
var path = require("path");

// *1 DONE
// *2 INCOMPLETE
module.exports = {
    // RFC959
    "USER": function (username) { // *2 RFC959 MINIMUM IMPLEMENTATION
        this.username = username;
        this.reply(230);
    },
    "PASS": function (password) {
        this.reply(202);
    },
    "ACCT": function (accountInformation) {
        this.reply(202);
    },
    "CWD": function (pathname) { // *1
        var self = this;
        var nwd = path.join(this.sandbox, path.resolve(this.vfs.cwd(), pathname));
        try {
            var stats = fs.lstatSync(nwd);
            if (!stats.isDirectory()) {
                self.reply(550);
                return;
            } else {
                self.vfs.chdir(pathname);
                self.reply(250);
            }
        } catch (e) {
            self.reply(550);
        }
    },
    "CDUP": function () { // *1
        this.vfs.chdir("..");
        this.reply(250);
    },
    "SMNT": function (pathname) { // Will not implement (Security Risk)
        this.reply(202);
    },
    "QUIT": function () { // *1 RFC959 MINIMUM IMPLEMENTATION
        this.reply(221);
        this.end();
    },
    "REIN": function () {
        this.reply(202);
    },
    "PORT": function (hostPort) { // *2 RFC959 MINIMUM IMPLEMENTATION
        var addr = hostPort.split(",");
        this.passive = false;
        this.data.socket = null;
        this.data.host = addr[0] + "." + addr[1] + "." + addr[2] + "." + addr[3];
        this.data.port = (parseInt(addr[4]) * 256) + parseInt(addr[5]);
        this.reply(200);
    },
    "PASV": function () {
        this.reply(202);
    },
    "TYPE": function (typeCode) { // *2 RFC959 MINIMUM IMPLEMENTATION
        switch (typeCode) {
        case "A":
            this.type = "ascii";
            this.reply(200);
            break;
        case "I":
            this.type = "binary";
            this.reply(200);
            break;
        case "E":
        case "L":
        default:
            this.reply(501);
            break;
        }
    },
    "STRU": function (structureCode) { // RFC959 MINIMUM IMPLEMENTATION
        this.reply(202);
    },
    "MODE": function (modeCode) { // RFC959 MINIMUM IMPLEMENTATION
        this.reply(202);
    },
    "RETR": function (pathname) { // RFC959 MINIMUM IMPLEMENTATION
        this.reply(202);
    },
    "STOR": function (pathname) { // RFC959 MINIMUM IMPLEMENTATION
        this.reply(202);
    },
    "STOU": function () {
        this.reply(202);
    },
    "APPE": function (pathname) {
        this.reply(202);
    },
    "ALLO": function () {
        this.reply(202);
    }, // <SP> <decimal-integer>, [<SP> R <SP> <decimal-integer>] <CRLF>
    "REST": function (marker) {
        this.reply(202);
    },
    "RNFR": function (pathname) {
        this.reply(202);
    },
    "RNTO": function (pathname) {
        this.reply(202);
    },
    "ABOR": function () {
        this.reply(202);
    },
    "DELE": function (pathname) { // *1
        var self = this;
        var filename = path.resolve(this.vfs.cwd(), pathname);
        fs.unlink(path.join(this.sandbox, filename), function (error) {
            if (error) {
                self.reply(550);
            } else {
                self.reply(250);
            }
        });
    },
    "RMD": function (pathname) { // *1
        var self = this;
        var filename = path.resolve(this.vfs.cwd(), pathname);
        fs.rmdir(path.join(this.sandbox, filename), function (error) {
            if (error) {
                self.reply(550);
            } else {
                self.reply(250);
            }
        });
    },
    "MKD": function (pathname) { // *1
        var self = this;
        var filename = path.resolve(this.vfs.cwd(), pathname);
        fs.mkdir(path.join(this.sandbox, filename), 0755, function (error) {
            if (error) {
                self.reply(550);
                return;
            }
            self.reply(257, "\"" + filename + "\" created.");
        });
    },
    "PWD": function () {
        this.reply(202);
    },
    "LIST": function (pathname) {
        this.reply(202);
    }, // [<SP> <pathname>] <CRLF>
    "NLST": function () {
        this.reply(202);
    }, // [<SP> <pathname>] <CRLF>
    "SITE": function (string) {
        this.reply(202);
    },
    "SYST": function () { // *2
        this.reply(215, "UNIX");
    },
    "STAT": function () {
        this.reply(202);
    }, // [<SP> <pathname>] <CRLF>
    "HELP": function () {
        this.reply(202);
    }, // [<SP> <string>] <CRLF>
    "NOOP": function () { // *1 RFC959 MINIMUM IMPLEMENTATION
        this.reply(200);
    }
};