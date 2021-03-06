const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const app = electron.app
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain
const path = require('path')
const url = require('url')
const {shell} = require('electron')
const {Tray} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let tray = null
app.on('ready', () => {
  tray = new Tray('C:/Users/Max/Pictures/iMac-icon.png')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})

//rightclick context menu
const menu = new Menu()
menu.append(new MenuItem({
  label: 'Hello'
}))
menu.append(new MenuItem({
  label: 'Checkbox',
  type: 'checkbox'
}))

app.on('browser-window-created', function(event, win) {
  win.webContents.on('context-menu', function(e, params) {
    menu.popup(win, params.x, params.y)
  })
})

ipc.on('show-context-menu', function(event) {
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // frame: false,
    //alwaysOnTop: true,
    // autoHideMenuBar : true,
    width: 800,
    height: 600
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// shell.openExternal('https://github.com')

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// require('./skript.js')
