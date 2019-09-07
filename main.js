const { app, BrowserWindow, dialog, Menu, shell } = require('electron');
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
      //generate tests
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
    fs.writeFileSync(path.join(__dirname, `/tests/${filePath}`), data, 'utf8');
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

      // creates the files in the tests folder
      // createTestFile('.env', env);
      //generate tests
      console.log(queries);
      createTestFile('tests.js', buildExportTestSuite.createTest(queries[0], queries[1]));

      //make a new output function that is an fs WRITE with the same data.
     fs.writeFile(result + '/tests.js', buildExportTestSuite.createTest(queries[0], queries[1]),function (err) {
          if (err) throw err;}); 
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

//--------------------- CREATE ENV FILE -------------------//

function createEnvFile(env) {
  try {
    fs.writeFileSync(path.join(__dirname, '/.env'), env, 'utf8')
  } catch (err) {
    return console.error(err);
  }
}

ipcMain.on('create-env-file', (env) => {
  createEnvFile(env);
});

//--------------------- MENU CUSTOMIZATION -------------------//

// customizes the about option in the menu bar
const originalTeam = 'Alena Budzko, Bryan Fong, Rodolfo Guzman, Jarred Jack Harewood, Geoffrey Lin';
const contributors = 'Haris Hambasic, Michelle Moody, Jessica Vaughan, Vance Wallace';
app.setAboutPanelOptions({applicationName: 'ProtoGraphQL', applicationVersion: '2.0', copyright: 'MIT License', credits: `Original Team\n${originalTeam}\n\nAdditional Contributors\n${contributors}`, website: 'https://github.com/oslabs-beta/protographql', iconPath: './public/assets/pictures/icon/icon.png'});

// set options for custom menu feature
const protographqlHelp = {
  buttons: ['OK'],
  message: 'Add Table\nCreate tables that mimic PSQL tables\n\nSchema\nView, edit or delete tables\n\nCode\nView generated GraphQL and SQL code before export\n\nVisualize\nView the GraphQL schema intuitively as a simple tree\n\nExport\nExport project to interact with database',
  title: 'ProtoGraphQL Help',
  type: 'info',
  icon: './public/assets/pictures/icon/icon.png',
  normalizeAccessKeys: true,
}

// the template and functions required to customize the menu bar - use the following format to add functionality { label: 'Swim', click () { 'clicked swim'}},
const template = [
  // { role: 'appMenu' }
  ...(process.platform === 'darwin' ? [{
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' },
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(process.platform === 'darwin' ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(process.platform === 'darwin' ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      { label: 'ProtoGraphQL Help', click () { dialog.showMessageBox(protographqlHelp) }},
      {
        label: 'ProtoGraphQL on GitHub', 
        click: async () => {
          await shell.openExternal('https://github.com/oslabs-beta/protographql')
        }
      },
      { type: 'separator' },
      {
        label: 'Learn More About Electron',
        click: async () => {
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);



