const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const ipc = require('electron').ipcMain;
const archiver = require('archiver')
const fs = require('fs');

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
});

app.on('activate', () => {
  if (win === null) createWindow();
});

//function to run when user clicks export
function showExportDialog(event) {
  dialog.showOpenDialog(
    {
      title: 'Choose location to save folder in',
      defaultPath: app.getPath('desktop'),
      message: 'Choose location to save folder in',
      properties: ['openDirectory']
    },
    result => {
      //if user closes dialog window without selecting a folder
      if (!result) return;

      // Overwrite Apollo Server code files
      try {
        console.log('File writing now...');
        fs.writeFileSync(path.join(__dirname, '/apollo-server/test.js'), testFile(), 'utf8');
        console.log('File overwritten!');
      } catch(err) {
        return console.error(err);
      } 

      const output = fs.createWriteStream(result + '/apollo-server.zip');
      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });

      // listen for all archive data to be written and output associated details
      output.on('close', function() {
        console.log('Zip file size is ', archive.pointer() + ' total bytes');
        console.log('Archived zip file is complete.');
        dialog.showMessageBox(win, 
          {
            type: "info",
            message:"Export Successful!",
            detail: 'File saved to ' + result + '/apollo-server.zip'
          }
        )
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
          console.error(err)
        } else {
          // throw error
          throw err;
        }
      });

      archive.on('error', function(err) {
        throw err;
      });

      // append files from apollo-server directory and naming it `apollo-server` within the archive
      archive.directory(__dirname + '/apollo-server/', 'apollo-server');

      // pipe the archive details to our zip file
      archive.pipe(output);

      // finalize the archive (ie we are done appending files but streams have to finish yet)
      // 'close' will be fired afterwards
      archive.finalize();
    }
  );
}
  
//listener for export button being clicked
ipc.on('show-export-dialog', event => {
  showExportDialog(event);
});

const testFile = () => 'Does this export file work?';