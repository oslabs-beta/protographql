const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const ipcMain = require('electron').ipcMain;
const archiver = require('archiver');
const fs = require('fs');
const buildExportTestSuite = require('./src/utils/buildExportTestSuite.js');

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

//---------------------APOLLO SERVER EXPORT ------------------------//

// Overwrite default Apollo Server code files
const createApolloFile = (filePath, data) => {
  try {
    fs.writeFileSync(path.join(__dirname, `/apollo-server/${filePath}`), data, 'utf8');
  } catch (err) {
    return console.error(err);
  }
}

//function to run when user clicks export
function showExportDialog(event, gqlSchema, gqlResolvers, sqlScripts, env, queries) {
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

      // creates the files in the apollo-sever folder
      createApolloFile('graphql/schema.js', gqlSchema);
      createApolloFile('graphql/resolvers.js', gqlResolvers);
      createApolloFile('db/createTables.sql', sqlScripts);
      createApolloFile('.env', env);
      //generate test-suite
      createApolloFile('tests/tests.js', buildExportTestSuite.createTest(queries[0], queries[1]));
      

      const output = fs.createWriteStream(result + '/apollo-server.zip', 
        // { autoClose: false }
      );
      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
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

      // pipe the archive details to our zip file -> pushes files into the zip
      archive.pipe(output);

      // finalize the archive (ie we are done appending files but streams have to finish yet)
      // 'close' will be fired afterwards
      archive.finalize();


      // listen for all archive data to be written and output associated details
      output.on('close', function () {
        console.log('Zip file size is ', archive.pointer() + ' total bytes');
        console.log('Archived zip file is complete.');

        //reverts templates to empty files for future use
        createApolloFile('graphql/schema.js', '');
        createApolloFile('graphql/resolvers.js', '');
        createApolloFile('db/createTables.sql', '');
        createApolloFile('.env', '');
        createApolloFile('tests/tests.js','')

        dialog.showMessageBox(win,
          {
            type: "info",
            buttons: ["Ok"],
            message: "Export Successful!",
            detail: 'File saved to ' + result + '/apollo-server.zip'
          }
        )
      });
    }
  );
}

//The function to create the test file 
const createTestFile = (filePath, data) => {
  try {
    //write to a file and replace if it already exists
    fs.writeFileSync(path.join(__dirname, `/test-suite/${filePath}`), data, 'utf8');
  } catch (err) {
    return console.error(err);
  }
}


//---------------------TEST EXPORT -------------------//


//function to run when user clicks "Export Tests"
function showTestExportDialog(event, queries) {
  dialog.showOpenDialog(
    {
      title: 'Choose location to save file',
      defaultPath: app.getPath('desktop'),
      message: 'Choose location to save file',
      properties: ['openDirectory']
    },
    result => {
      //if user closes dialog window without selecting a folder
      if (!result) return;

      // creates the files in the test-suite folder
      // createTestFile('.env', env);
      //generate test-suite
      console.log(queries);
      //changed this to the root of the folder "test-suite" rather than "tests" within the folder -VW
      createTestFile('tests.js', buildExportTestSuite.createTest(queries[0], queries[1]));

      //make a new output function that is an fs WRITE with the same data.
     fs.writeFile(result + 'tests.js', buildExportTestSuite.createTest(queries[0], queries[1]),function (err) {
          if (err) throw err;}); 

         //changed this to the root of the folder "test-suite" rather than "tests" within the folder -VW
        createTestFile('tests.js','')

        dialog.showMessageBox(win,
          {
            type: "info",
            buttons: ["Ok"],
            message: "Export Successful!",
            detail: 'File saved to ' + result + '/tests.js'
          }
        )
      });
    }

//listener for Apollo Server export button being clicked
ipcMain.on('show-export-dialog', (event, gqlSchema, gqlResolvers, sqlScripts, env, queries) => {
  console.log('show-export-dialog => ', queries);
  showExportDialog(event, gqlSchema, gqlResolvers, sqlScripts, env, queries);
});

//listener for test export button being clicked
ipcMain.on('show-test-export-dialog', (event, queries) => {
  console.log('show-test-export-dialog => ', queries);
  showTestExportDialog(event, queries);
});
