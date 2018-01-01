class Twitch {
    constructor(twitchSettings) {
        this.clientId = "jccqzsee2ome0ua5opwxr6rjjjj8a3";
        this.baseUri = "https://api.twitch.tv/";
        this.vNew = "helix";
        this.v5 = "kraken"
        this.userObject = twitchSettings;
    };

    async GetUser(nameOrId) {
        let params = isNaN(nameOrId) ? {"login": nameOrId} : {"id": nameOrId};
        let data = await this.Ajax("/users", this.vNew, "get", params);

        this.userObject = data.data.data[0];
        return this.userObject;
    }

    async GetStream() {
        let data = await this.Ajax("/streams", this.vNew, "get", {"user_id": this.userObject.id });

        return data.data.data[0];
    }

    async GetRecentFollower() {
        let data = await this.Ajax("/users/follows/", this.vNew, "get", { "to_id": this.userObject.id, "first": 1 });

        return data.data.data[0];
    };

    async GetRecentSubscriber() {
        // let data = await this.Ajax("/channels/"+this.userObject.id+"/subscriptions", this.v5, "get", { "limit": 1 });

        // return data.data.data[0];

        console.error("GetRecentSubscriber is not supported.");
    };

    GetRecentCheer() {
        $.ajax({
            "url": this.baseUri+"bits/channels/"+this.channelId+"/events/recent",
            "type": "get", 
            "data": {},
            "dataType": "json",
            "crossDomain": true,
            "headers": this.GetHeaders(),
            "success": function(json) {
                $(".recents .bits dd").text(json.recent.username);
            },
            "error": function(json) {
                console.log(json);
                $(".recents .bits dd").text(self.Error(json.status));
            }
        });
    };

    GetHeaders() {
        var data = {};
        data["Accept"] = "application/vnd.twitchtv.v5+json";

        if (this.clientId) {
            data["Client-ID"] = this.clientId;
        }

        if (this.userToken) {
            data["Authorization"] = "OAuth " + this.userToken
        }

        return data;
    };

    Error(num) {
        codes = {
            422: "Subscriptions are not enabled",
            404: "Not found"
        }

        return codes[num];
    };

    Ajax(url, api, verb, data) {
        return axios({
            "url" : this.baseUri + api + url,
            "method": verb != "" ? verb : "get", 
            "params": data ? data : {},
            "headers": this.GetHeaders()
        });
    };
}

module.exports = new Twitch();