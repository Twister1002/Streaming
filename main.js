// Define global values
const {app, BrowserWindow, Menu, MenuItem, ipcMain} = require('electron');
const path = require("path");

global.rootDir = __dirname;
const utilities = require("./library/js/utilities.js");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const menu = new Menu();

function createWindow () {

	// Create the browser window.
	win = new BrowserWindow({
		width: 1024, 
		height: 800,
		minWidth: 450,
		minHeight: 450
	});

	// and load the index.html of the app.
    win.loadURL(utilities.LoadFile("parts/index.html"));
    
    win.openDevTools();

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
    });
    menu.append(new MenuItem({
        "label": "File",
        "submenu": [
            {
                "label": "Quit",
                "click": () => {
                    app.quit();
                }
            }
        ]
    }));
    menu.append(new MenuItem({
        "label": "View",
        "submenu": [
            {
                "label": "Reload", 
                "role": "reload",
                "accelerator": "CmdOrCtrl+R",
                "click": () => { 
                    win.reload();
                }
            },
            {
                "label": "Console Window", 
                "accelerator": "CmdOrCtrl+I",
                "click": () => {
                    win.openDevTools();
                }
            }
        ]
    }));
    menu.append(new MenuItem({
        "label": "Settings",
        "submenu": [
            {
                "label": "Twitch Info",
                "accelerator": "CmdOrCtrl+T",
                "click": () => {
                    win.loadURL(utilities.LoadFile("parts/settings.html"));
                }
            },
            {
                "label": "Social Media",
                "click": () => {
                    console.log("Open Social Media");
                }
            }
        ]
    }));

    Menu.setApplicationMenu(menu);

    win.once("ready-to-show", () => {
        win.show();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("sync:app", (e, arg) => {
    if (arg === "appPath") {
        e.returnValue = app.getAppPath();
    }
    else {
        e.returnValue = app.getPath(arg);
    }
});

// // When a window calls this method, then reply with the correct information
// ipcMain.on("sync:Settings", (event, arg) =>  {
//     // Get the json file with the settings
//     event.returnValue = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
// });

// ipcMain.on("sync:SaveSettings", (event, settings) => {
//     // For now just save the file without verifying the integrity.
//     fs.writeFileSync(settingsFile, JSON.stringify(settings));
// });