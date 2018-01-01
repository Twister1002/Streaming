const {app, ipcRenderer} = require("electron");
const axios = require("axios");
const path = require("path");
const fs = require("fs");


const util = require("../library/modules/utilities.js");
const settings = require("../library/modules/settings.js");
const twitch = require("../library/modules/twitch.js");

// Load the twitch data
(async () => {
    await twitch.GetUser(settings.GetFieldValue("twitch", "name"));
    twitch.GetRecentFollower();
    twitch.GetRecentSubscriber();
})();
