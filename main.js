const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

// Global reference of the window object to avoid JS garbage collection
// when window is created
let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        // this is only for Windows and Linux
        icon: './public/assets/pictures/ProtoGraphQLLogo.png'
     });
    //  console.log('Our dialog: ', dialog.showOpenDialog({
    //      properties: ['openFile', 'openDirectory', 'multiSelections']
    //  }));

    //Maximize browser window
    win.maximize();

    // Serve our index.html file
    // mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    win.loadFile('index.html');

    // Open developer tools panel when our window opens
     win.webContents.openDevTools();

    // Add event listener to set our global window variable to null
    // This is needed so that window is able to reopen when user relaunches the app
    win.on('closed', () => {
        win = null;
    });
}

// Creates our window when electron has initialized for the first time
app.on('ready', createWindow);


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

app.on('activate', () => {
    if (win === null) createWindow();
})