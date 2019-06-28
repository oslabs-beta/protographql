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
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true
    },
    // this is only for Windows and Linux
    icon: path.join(__dirname, 'public/assets/pictures/ProtoGraphQLLogo64.png')
  });

  win.setMinimumSize(265, 630);

  //Maximize browser window
  win.maximize();


  // Serve our index.html file
  // mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  win.loadFile('index.html');

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

// Overwrite default Apollo Server code files
const createFile = (filePath, data) => {
  try {
    fs.writeFileSync(path.join(__dirname, `/apollo-server/${filePath}`), data, 'utf8');
  } catch (err) {
    return console.error(err);
  }
}

//function to run when user clicks export
function showExportDialog(event, gqlSchema, gqlResolvers, sqlScripts, env) {
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

      createFile('graphql/schema.js', gqlSchema);
      createFile('graphql/resolvers.js', gqlResolvers);
      createFile('db/createTables.sql', sqlScripts);
      createFile('.env', env);

      const output = fs.createWriteStream(result + '/apollo-server.zip');
      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });



      // listen for all archive data to be written and output associated details
      output.on('close', function () {
        console.log('Zip file size is ', archive.pointer() + ' total bytes');
        console.log('Archived zip file is complete.');

        createFile('graphql/schema.js', '');
        createFile('graphql/resolvers.js', '');
        createFile('db/createTables.sql', '');
        createFile('.env', '');

        dialog.showMessageBox(win,
          {
            type: "info",
            message: "Export Successful!",
            detail: 'File saved to ' + result + '/apollo-server.zip'
          }
        )
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') console.error(err)
        else throw err;
      });

      archive.on('error', function (err) {
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
ipc.on('show-export-dialog', (event, gqlSchema, gqlResolvers, sqlScripts, env) => {
  showExportDialog(event, gqlSchema, gqlResolvers, sqlScripts, env);
});
