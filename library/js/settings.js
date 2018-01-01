const fs = require("fs");
const path = require("path");
const axios = require("axios");
const {app, ipcRenderer} = require("electron");

const settings = require("../library/modules/settings.js");
const util = require("../library/modules/utilities.js");
const twitch = require("../library/modules/twitch.js");

const submitButton = document.getElementById("update_settings_button");
const fields = document.querySelectorAll(".field input");

// Load the values for each field
(function() {
    fields.forEach((e, i) => {
        e.value = settings.GetValue(e);
    });
}());

submitButton.addEventListener("click", (e) => {
    util.SetMessage("Updating settings...", "warning");
    if (settings.UpdateSettings(fields)) {
        settings.UpdateTwitchInfo();
        util.SetMessage("Your settings were updated.", "success");
    }
    else {
        util.SetMessage("Your information could not be updated.", "error");
    }
});

