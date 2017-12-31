const axios = require("axios");

class Twitch {
    constructor(name) {
        this.name = name;
        this.clientId = "jccqzsee2ome0ua5opwxr6rjjjj8a3";
        this.baseUri = "https://api.twitch.tv/";
        this.apiVersion = "helix";

        if (this.userId == "") {
            data = this.GetUser(this.name);
            this.userId = data.id;
            this.broadcaster_type = data.broadcaster_type;

            $(".header .name").text(data.display_name);

            this.Init();
        }
    };

    Init() {
        this.GetRecentFollower();
        // this.GetRecentSubscriber();
        // this.GetRecentCheer();
    };

    GetUser(nameOrId) {
        params = isNaN(nameOrId) ? {"login": nameOrId} : {"id": nameOrId};
        var data = null;

        this.Ajax("/users", "get", params, false,
        function(json) {
            if (json.data.length == 1) {
                data = json.data[0];
            }
            else {
                console.log("Error in loading user.");
            }
        },
        function(json) {
            console.log(json);
        });

        return data;
    }

    GetRecentFollower() {
        var self = this;
        this.Ajax("/users/follows/", "get", { "to_id": this.userId, "first": 1 }, true,
            function(json) {
                // Now get the user information about who followed.
                data = self.GetUser(json.data[0].from_id);
                
                $(".recents .follower dd").text(data.display_name);
            },
            function(json) {
                console.log(json);
                $(".recents .follower dd").text("N/A");
            }
        );
    };

    GetRecentSubscriber() {
        var self = this;
        $.ajax({
            "url": this.baseUri+this.apiVersion+"/channels/"+this.channelId+"/subscriptions",
            "type": "get", 
            "data": {"limit": 1},
            "dataType": "json",
            "crossDomain": true,
            "headers": this.GetHeaders(),
            "success": function(json) {
                console.log(json);
                $(".recents .sub dd").text(json.subscriptions[0].user.name);
            },
            "error": function(json) {
                console.log(json);
                $(".recents .sub dd").text(self.Error(json.status));
            }
        });
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
        data = {};
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

    Ajax(url, verb, data, async, success, error) {
        axios({
            "url": this.baseUri + this.apiVersion + url,
            "method": verb != "" ? verb : "get", 
            "data": data ? data : {},
            "head": this.GetHeaders(),
        });
        // $.ajax({
        //     "url": this.baseUri+this.apiVersion+url,
        //     "type": verb != "" ? verb : "get", 
        //     "data": data ? data : {},
        //     "dataType": "json",
        //     "crossDomain": true,
        //     "async": async ? true : async,
        //     "headers": this.GetHeaders(),
        //     "success": success,
        //     "error": error
        // });
    };
}

module.exports = new Twitch();