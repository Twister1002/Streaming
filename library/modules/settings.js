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
    
    _Update() {
        // The fields are updated, now update the time and save the file.
        this._data.updated = (Date.now() / 1000 | 0);
        fs.writeFileSync(path.join(ipcRenderer.sendSync("sync:app", "userData"), "settings.json"), JSON.stringify(this._data));
        return true;
    }

    UpdateField(type, key, value) {
        this._data[type][key] = value;
        return this._Update();
    }

    UpdateSettings(data) {
        data.forEach((e, i) => {
            let fieldArray = e.id.split("_");
            this._data[fieldArray[0]][fieldArray[1]] = e.value;
        });

        return this._Update();
    }

    async UpdateTwitchInfo() {
        let userInfo = await twitch.GetUser(this._data.twitch.name);
        let streamData = await twitch.GetStream();
        let lastFollow = await twitch.GetRecentFollower();
        let lastSub = await twitch.GetRecentSubscriber();

        this._data.twitch.isAffiliate = userInfo.broadcaster_type == "affiliate";
        this._data.twitch.isPartner = userInfo.broadcaster_type == "partner";
        this._data.twitch.channel_id = streamData.id;
        this._data.twitch.name = userInfo.login;
        this._data.twitch.id = userInfo.id;

        this._Update();
    }

    GetValue(field) {
        let fieldArray = field.id.split("_");
        return this._data[fieldArray[0]][fieldArray[1]];
    }

    GetFieldValue(type, field) {
        return this._data[type][field];
    }
}

module.exports = new Settings();
