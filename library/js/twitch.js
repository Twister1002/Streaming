jQuery(document).ready(function() {
    var twitch = (function () {
        function twitch(name) {
            this.name = name;
            this.clientId = "jccqzsee2ome0ua5opwxr6rjjjj8a3";
            this.baseUri = "https://api.twitch.tv/";
            this.apiVersion = "kraken";
            this.scopes = "channel_subscriptions channel_read channel_editor user_read";
            this.token = "token";
            this.userToken = "";
            this.channelId = "";

            if (location.hash) {
                this.LogUserIn();
                this.LoadData();
            }
            else {
                this.Login();
            }
        };

        twitch.prototype.LoadData = function() {
            this.GetRecentFollower();
            this.GetRecentSubscriber();
            this.GetRecentCheer();
        };

        twitch.prototype.Login = function() {
            var data = {
                "client_id": this.clientId, 
                "scope": this.scopes,
                "redirect_uri": "http://localhost/overlay",
                "response_type": this.token
            };
            var params = "";
            $.each(data, function(i, e) {
                if(params) params += "&";
                params += i+"="+e;
            });
            
            // var loginWindow = window.open(this.baseUri+this.apiVersion+"/oauth2/authorize?"+params, "_blank");
            // $(loginWindow.location.href).on("change", function(e) {
            //     console.log("In here!");
            // });

            $("iframe")
            .attr("src", this.baseUri+this.apiVersion+"/oauth2/authorize?"+params )
            .on("load", function(e) {
                console.log(this);
            })
        };

        twitch.prototype.LogUserIn = function() {
            var token = "";
            var self = this;
            
            hashData = location.hash.split("&");
            $.each(hashData, function(i, e) {
                if (e.indexOf("accessToken")) {
                    token = e.substr(e.indexOf('=')+1);
                    return false;
                }
            });

            this.userToken = token;

            // Now gather the information about the channel
            $.ajax({
                "url": this.baseUri+this.apiVersion+"/channel",
                "type": "get",
                "crossDomain": true,
                "async": false,
                "headers": this.GetHeaders(),
                "success": function(json) {
                    self.channelId = json._id;
                },
                "error": function(json) {
                    console.log(json);
                }
            })
        };

        twitch.prototype.IsLoggedIn = function() {
            if (this.userToken) {
                return true;
            }
            else {
                return false;
            }
        };

        twitch.prototype.GetRecentFollower = function () {
            $.ajax({
                "url": this.baseUri+this.apiVersion+"/channels/"+this.channelId+"/follows",
                "type": "get", 
                "data": {"limit": 1},
                "dataType": "json",
                "crossDomain": true,
                "headers": this.GetHeaders(),
                "success": function(json) {
                    $(".recents .follower dd").text(json.follows[0].user.name);
                },
                "error": function(json) {
                    console.log(json);
                }
            });
        };

        twitch.prototype.GetRecentSubscriber = function() {
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

        twitch.prototype.GetRecentCheer = function() {
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

        twitch.prototype.GetHeaders = function() {
            data = {};
            data["Accept"] = "application/vnd.twitchtv.v5+json";

            if (this.client_id) {
                data["Client-ID"] = this.clientId;
            }

            if (this.userToken) {
                data["Authorization"] = "OAuth " + this.userToken
            }

            return data;
        };

        twitch.prototype.Error = function(num) {
            codes = {
                422: "Subscriptions are not enabled",
                404: "Not found"
            }

            return codes[num];
        };

        return twitch;
    }());

    twitch = new twitch("twister1002");
});