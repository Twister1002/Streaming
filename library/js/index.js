const {app, ipcRenderer} = require("electron");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const util = require("../library/modules/utilities.js");
const settings = require("../library/modules/settings.js");
const twitch = require("../library/modules/twitch.js");
const socialElement = document.querySelector(".social ul");

// Load the Information saved from the user
(function() {
    let labelSettings = settings.GetType("labels");
    let layoutSettings = settings.GetType("layout");
    let socialSettings = settings.GetType("social");

    for (let setting in labelSettings) {
        let settingField = document.querySelector(".title_"+setting)

        if (settingField) {
            if (setting.includes("_file")) {
                let fileData = fs.readFile(labelSettings[setting], "utf-8", (err, data) => {
                    settingField.textContent = data;
                });
            }
            else {
                settingField.textContent = labelSettings[setting];
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

    for (let social in socialSettings) {
        let socialSplit = social.split("_");
        let element = document.createElement("li");
        let text = document.createTextNode(socialSettings[social]);

        element.classList.add(socialSplit[0].toLowerCase(), "icon-"+socialSplit[0].toLowerCase());
        element.appendChild(text);
        socialElement.appendChild(element);
    }
})();