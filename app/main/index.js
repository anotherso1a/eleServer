const { app, BrowserWindow } = require('electron')
const { watcherHandler, notifacationHandler, directoryHandler } = require('./ipcHandler')

const path = require('path')
let mainWindow

function createMainWindow() {
  const readyPagePath = path.join(__dirname, '../render/pages/index.html')

  mainWindow = new BrowserWindow({
    width: 400,
    height: 780,
    // opacity: 0.7,
    webPreferences: {
      nodeIntegration: true, // 开启渲染进程可使用node模式
      contextIsolation: false
    }
  })

  // 开启渲染进程的调试模式
  // mainWindow.webContents.openDevTools()

  mainWindow.loadFile(readyPagePath)
  return mainWindow
}

app.whenReady().then(() => {
  watcherHandler() // 添加监控ipc
  notifacationHandler() // 添加消息通知ipc
  directoryHandler() // 选择文件夹
  createMainWindow()
})
