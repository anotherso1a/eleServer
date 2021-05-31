const { BrowserWindow } = require("electron");

module.exports = (msg) => {
  let mainWindow = BrowserWindow.getAllWindows().find(e => e.title === '直播监测软件')
  mainWindow.webContents.send('log', msg);
}