const path = require("path");
const url = require('url');

class Utiltiies {

    LoadFile(file) {
        if (path === null || url === null) {
            console.error("Path is not defined.");
            return;
        }

        var urlPath = url.format({
            pathname: path.join(global.rootDir, file),
            protocol: 'file:',
            slashes: true
        });
    
        return urlPath;
    }

}

module.exports = new Utiltiies();