var path = require("path");

function vfs(root) {
    if (!root) root = "/";
    this.dir = root;
}
module.exports = vfs;

vfs.prototype.chdir = function (dir) {
    this.dir = path.resolve(this.dir, dir);
    return (this.dir);
}

vfs.prototype.cwd = function () {
    return (this.dir);
}