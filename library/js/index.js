const {electron, ipcRenderer} = require("electron");

let settings = ipcRenderer.sendSync("sync:Settings");
