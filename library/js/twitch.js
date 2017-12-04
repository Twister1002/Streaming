jQuery(document).ready(function() {
    var twitch = (function () {
        function twitch(name) {
            this.name = name;
            this.clientId = "jccqzsee2ome0ua5opwxr6rjjjj8a3";
            this.baseUri = "https://api.twitch.tv/kraken";
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
            
            window.location.href = this.baseUri+"/oauth2/authorize?"+params;
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
                "url": this.baseUri+"/channel",
                "type": "get",
                "crossDomain": true,
                "async": false,
                "headers": {
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Client-ID": this.clientId,
                    "Authorization": "OAuth " + this.userToken
                },
                "success": function(json) {
                    console.log(json);
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
                "url": this.baseUri+"/channels/"+this.channelId+"/follows",
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

        return twitch;
    }());

    twitch = new twitch("twister1002");
});