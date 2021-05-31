const { ipcMain, Notification } = require("electron")
const { start, stop } = require('../watcher/index')

const watcherHandler = () => {
  ipcMain.handle('watchControl', async (event, { type, detail }) => {
    switch (type) {
      case 'start':
        start(detail)
        break;
      case 'stop':
        stop()
        break;
    }
  })
}

const notifacationHandler = () => {
  ipcMain.handle('messageTip', async (event, { ...args }) => {
    const { body, title, actions, closeButtonText } = args

    return await new Promise((resolve, reject) => {
      try {
        let notification = new Notification({
          title,
          body,
          actions,
          closeButtonText
        })
        notification.show()
        notification.on('action', function () {
          resolve({
            event: 'action'
          })
        })
        notification.on('close', function () {
          resolve({
            event: 'close'
          })
        })
      } catch (e) {
        console.warn(e)
        reject(e)
      }
    })
  })
}

module.exports = {
  watcherHandler,
  notifacationHandler
}