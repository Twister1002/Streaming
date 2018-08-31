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
        // if (!fs.existsSync(this._file)) {
        //     // Load default settings
        //     let defaultSettings = JSON.parse(fs.readFileSync("./library/settings-default.json", "utf-8"));
        //     fs.writeFileSync(path.join(ipcRenderer.sendSync("sync:app", "userData"), "settings.json"), JSON.stringify(defaultSettings));
        //     this._data = JSON.parse(fs.readFileSync(this._file, "utf-8"));
        // }

        if (fs.existsSync(this._file)) {
            this._data = JSON.parse(fs.readFileSync(this._file, "utf-8"));
        }
    }

    LoadTwitchFields() {
        let html = "";
        let twitchData = Object.keys(this._data.twitch).forEach((e, i) =>{
            console.log(e);
        });

        return html;
    };

    LoadSocialFields() {
        let html = "";
        let twitchData = Object.keys(this._data.social).forEach((e, i) =>{
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
            let seperator = e.id.indexOf("_");
            let type = e.id.substring(0, seperator);
            let fieldName = e.id.substring(seperator+1);

            if (e.value) { 
                if (!this._data.hasOwnProperty(type)) {
                    this._data[type] = {};
                }
                if (!this._data[type].hasOwnProperty(fieldName)) {
                    this._data[type][fieldName] = "";
                }
                
                this._data[type][fieldName] = e.value;
            }
            else {
                if (this._data.hasOwnProperty(type)) {
                    if (this._data[type].hasOwnProperty(fieldName)) {
                        delete this._data[type][fieldName];
                    }
                }
            }
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
        this._data.twitch.channel_id = userInfo.id;
        this._data.twitch.name = userInfo.login;
        this._data.twitch.id = userInfo.id;

        this._Update();
    }

    GetValue(field) {
        let seperator = field.id.indexOf("_");
        let type = field.id.substring(0, seperator);
        let fieldName = field.id.substring(seperator+1);

        if (this._data.hasOwnProperty(type)) {
            if (this._data[type].hasOwnProperty(fieldName)) {
                return this._data[type][fieldName];
            }
        }

        return "";
    }

    GetFieldValue(type, field) {
        if (this._data.hasOwnProperty(type)) {
            if (this._data[type].hasOwnProperty(field)) {
                return this._data[type][field];
            }
        }
        
        return null;
    }

    GetType(type) {
        return this._data[type];
    }
}

module.exports = new Settings();
