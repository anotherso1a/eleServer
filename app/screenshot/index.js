const { BrowserWindow } = require("electron")
const fs = require('fs-extra')

const screenshot = async ({
  show = false,
  x = 1920,
  y = 1080,
  url,
  wait = 1000,
  name
} = {}) => {
  let win = new BrowserWindow({
    show,
    width: x,
    height: y,
    webPreferences: {
      nodeIntegration: true, // 开启渲染进程可使用node模式
      contextIsolation: false
    }
  })
  let error = null
  try {
    win.loadURL(url)
    await new Promise(r => setTimeout(r, wait))
    let img = await win.capturePage()
    fs.writeFileSync(name, img.toPNG())
  } catch (err) {
    error = err
  }
  win.destroy() // 销毁窗口
  return error
}


module.exports = screenshot