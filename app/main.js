const electron = require('electron');
const {app} = electron;
const {Menu} = electron;
const {BrowserWindow} = electron;
const {menuTemplate} = require('./menu.js');
const pkg = require('../package.json');

function createWindow() {

  let x = 0;
  let y = 0;
  let displays = electron.screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  });
  if (externalDisplay !== undefined) {
    x = externalDisplay.bounds.x;
    y = externalDisplay.bounds.y;
  }

  var win = new BrowserWindow({
    width: 1920,
    height: 1080,
    title: pkg.productName,
    icon: 'resources/app-icon.png',
    frame: false,
    resizable: false,
    backgroundColor: '#101214',
    useContentSize: true
  });
  win.setPosition(x, y);

  win.loadURL(`file://${__dirname}/index.html`);

  win.on('closed', () => {
    win = null;
  });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.setName(pkg.productName);
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

module.exports = createWindow
