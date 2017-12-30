const {app,ipcRenderer} = require("electron");
const fs = require("fs");
const path = require("path");

class Settings {

    constructor() {
        this._file = "";
        this._data = {};
        this.Init();
    }

    Init() {
        if (this._file == "") {
            this._file = path.join(ipcRenderer.sendSync("sync:app", "userData"), "settings.json");
        }

        // Verify that the settings file exists. If not, create it.
        if (!fs.existsSync(this._file)) {
            // Load default settings
            var defaultSettings = JSON.parse(fs.readFileSync("settings-default.json", "utf-8"));
            fs.writeFileSync(path.join(ipcRenderer.sendSync("sync:app", "userData"), "settings.json"), JSON.stringify(defaultSettings));
        }

        this._data = JSON.parse(fs.readFileSync(this._file, "utf-8"));
    }

    get data() {
        return this._data;
    }

}

module.exports = new Settings();
