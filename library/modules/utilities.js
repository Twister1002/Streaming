const path = require("path");
const url = require('url');

class Utiltiies {

    LoadFile(file) {
        var urlPath = url.format({
            pathname: path.join(global.rootDir, file),
            protocol: 'file:',
            slashes: true
        });
    
        return urlPath;
    }

    SetMessage(string, classType) {
        if (string != "") {
            document.getElementById("message").classList.add(classType);
            document.getElementById("message").innerText = string;
        }
    }

    Ajax(url, verb, success, error) {

    }

}

module.exports = new Utiltiies();