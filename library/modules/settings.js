const {ipcRenderer} = require("electron");
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

    LoadTwitchFields() {
        var html = "";
        var twitchData = Object.keys(this._data.twitch).forEach((e, i) =>{
            console.log(e);
        });

        return html;
    };

    LoadSocialFields() {
        var html = "";
        var twitchData = Object.keys(this._data.social).forEach((e, i) =>{
            console.log(e);
        });

        return html;
    }
    
    Update(data) {
        data.forEach((e, i) => {
            var fieldArray = e.id.split("_");
            this._data[fieldArray[0]][fieldArray[1]] = e.value;
        });

        // The fields are updated, now update the time and save the file.
        this._data.updated = (Date.now() / 1000 | 0);
        fs.writeFileSync(path.join(ipcRenderer.sendSync("sync:app", "userData"), "settings.json"), JSON.stringify(this._data));
    }
}

module.exports = new Settings();
