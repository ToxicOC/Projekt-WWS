// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const ipc = require('electron').ipcRenderer
const nativeImage = require('electron').nativeImage
const newWindowBtn = document.getElementById('new-window')
// const focusModalBtn = document.getElementById('focusBtn')

let win
let image = nativeImage.createFromPath('C:/Users/Max/Pictures/iMac-icon.png')
console.log(image)

newWindowBtn.addEventListener('click', function(event) {
  const modalPath = path.join('file://', __dirname, 'new-window.html')
  win = new BrowserWindow({
    // transparent: true,
    // frame: false,
    // modal: true,
    // darkTheme: true,
    // backgroundcolor: '#66CD00',
    // titleBarStyle: 'hidden',
    // thickFrame : false,
    autoHideMenuBar: true,
    width: 400,
    height: 320
  })
  win.on('focus', () => {
    win.blur()
  })
  win.on('resize', updateReply)
  win.on('move', updateReply)
  win.on('blur', () => {
    win.close()
  })
  win.on('close', () => {
    // hideFocusBtn()
    win = null
  })
  win.loadURL(modalPath)
  win.showInactive()
  console.log(win.isModal())
  // function showFocusBtn (btn) {
  //   if (!win) return
  //   focusModalBtn.classList.remove('disappear')
  //   focusModalBtn.classList.add('smooth-appear')
  //   focusModalBtn.addEventListener('click', function () {
  //     win.focus()
  //   })
  // }
  // function hideFocusBtn() {
  //   focusModalBtn.classList.remove('smooth-appear')
  //   focusModalBtn.classList.add('disappear')
  // }
  function updateReply() {
    const manageWindowReply = document.getElementById('manage-window-reply')
    const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`
    manageWindowReply.innerText = message
  }
})

// Notification on start up added
let myNotification = new Notification('Title', {
  body: 'Stuff',
  silent: 'silent',
  icon: 'C:/Users/Max/Pictures/iMac-icon.png'
})
// if (myNotification.isSupported()) {
// console.log(myNotification.isSupported());
// }
myNotification.onclick = () => {
  console.log(myNotification)
}
