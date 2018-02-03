const {app, ipcRenderer} = require("electron");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const util = require("../library/modules/utilities.js");
const settings = require("../library/modules/settings.js");
const twitch = require("../library/modules/twitch.js");

// Load the Information saved from the user
(function() {
    let titleSettings = settings.GetType("title");
    let layoutSettings = settings.GetType("layout");

    for (let setting in titleSettings) {
        let settingField = document.querySelector(".title_"+setting)

        if (settingField) {
            if (setting.includes("_file")) {
                let fileData = fs.readFile(titleSettings[setting], "utf-8", (err, data) => {
                    settingField.textContent = data;
                });
            }
            else {
                settingField.textContent = titleSettings[setting];
            }
        }
    }

    for (let setting in layoutSettings) {
        switch (setting) {
            case "follow_border-color":
                let borderColor = document.querySelectorAll("dt, dd");
                for (let settingField of borderColor) {
                    settingField.style["border-color"] = layoutSettings[setting];
                }
                break;
            default:
                let settingField = document.querySelector(".layout_"+setting)
                document.querySelector("body").style[setting] = layoutSettings[setting];
                break;
        }
    }
})();