const fs = require("fs");
const path = require("path");
const {app} = require("electron");


class Settings {

    constructor() {
        this.file = path.join(app.getPath("userData"), "settings.json");
        this.data = {};
        this.Init();
    }

    Init() {
        // Verify that the settings file exists. If not, create it.
        if (!fs.existsSync(settingsFile)) {
            // Load default settings
            defaultSettings = JSON.parse(fs.readFileSync("settings-default.json", "utf-8"));
            fs.writeFileSync(path.join(app.getPath("userData"), "settings.json"), JSON.stringify(defaultSettings));
        }

        this.data = JSON.parse(fs.readFileSync(this.file, "utf-8"));
    }

}

module.exports = new Settings();
