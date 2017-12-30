const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require("path");
const fs = require("fs");
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const settingsFile = path.join(app.getPath("userData"), "settings.json");

function createWindow () {

	// Create the browser window.
	win = new BrowserWindow({
		width: 1024, 
		height: 800,
		minWidth: 450,
		minHeight: 450
	});

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'parts/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	win.webContents.openDevTools();

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
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

// When a window calls this method, then reply with the correct information
ipcMain.on("sync:Settings", (event, arg) =>  {
    // Get the json file with the settings
    event.returnValue = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
});

ipcMain.on("sync:SaveSettings", (event, settings) => {
    // For now just save the file without verifying the integrity.
    fs.writeFileSync(settingsFile, JSON.stringify(settings));
});

// This method is executed when the browser window is created
app.on("browser-window-created", function() {
    // Verify that the settings file exists. If not, create it.
    if (!fs.existsSync(settingsFile)) {
        // Load default settings
        defaultSettings = JSON.parse(fs.readFileSync("settings-default.json", "utf-8"));
        fs.writeFileSync(path.join(app.getPath("userData"), "settings.json"), JSON.stringify(defaultSettings));
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
