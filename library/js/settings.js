const fs = require("fs");
const path = require("path");
const axios = require("axios");
const {app, ipcRenderer} = require("electron");
const {dialog} = require("electron").remote;

const settings = require("../library/modules/settings.js");
const util = require("../library/modules/utilities.js");
const twitch = require("../library/modules/twitch.js");

const submitButton = document.getElementById("update_settings_button");
const fields = document.querySelectorAll(".field input");
const fileButtons = document.querySelectorAll(".file_opener");

// Load the values for each field
(function() {
    fields.forEach((e, i) => {
        e.value = settings.GetValue(e);
    });

    DisplayLayoutSettings();
}());

// Add event listeners to all file buttons
for (let button of fileButtons) {
    button.addEventListener("click", function(e) {
        let filePath = dialog.showOpenDialog({
            "properties": ["openFile"]
        });

        // Save the file in the text field
        if (typeof filePath != "undefined") { // Prevents saving "undefined"
            this.value = filePath;
        }
    });
}

submitButton.addEventListener("click", (e) => {
    util.SetMessage("Updating settings...", "warning");
    try {
        if (settings.UpdateSettings(fields)) {
            DisplayLayoutSettings();
        }

        settings.UpdateTwitchInfo();
        util.SetMessage("Your settings were updated.", "success");
    }
    catch(v) {
        util.SetMessage("Your information could not be updated.", "error");
    }
});

function DisplayLayoutSettings() {
    // Lets update the looks here
    let layoutSettings = settings.GetType("layout");
    for (let setting in layoutSettings) {
        let settingField = document.querySelector(".layout_"+setting)

        document.querySelector("body").style[setting] = layoutSettings[setting];
    }
}