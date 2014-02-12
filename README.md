# node FTP Server

The inital aim of this FTP server is to have complete RFC959 implementation. For the future look at roadmap.

## Install

```bash
# Install from sources...
git clone git://github.com/leonpegg/node-ftpd.git node-ftpd
cd node-ftpd
npm link

# ...Then in your project
npm link node-ftpd
```

You can run unit tests:

```bash
# From your project where node-ftpd has been installed as a module
npm test node-ftpd

# Or directly from node-ftpd
npm test
```

## Usage

Example: Simply serve a given directory:

```javascript
var ftpd = require("node-ftpd");
var optons = {
    sandbox: "/path/to/ftp-root"
}
var server = ftpd.createServer(options);
// Start listening on port 2121 (you need to be root for ports < 1024 and this is a bad idea)
server.listen(2121);
```

## Extend server

Not yet implemented

## Roadmap

 * Complete RFC959 implementation
 * Implement authentication addon support
 * Implement filesystem addon support
 * Implement RFC2228
 * Implement RFC2428

## License: MIT

```
Copyright (c) 2014 Leon Pegg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```