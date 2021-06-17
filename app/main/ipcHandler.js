const { ipcMain, Notification, dialog } = require("electron")
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

const directoryHandler = () => {
  ipcMain.on('open-directory-dialog', function (event, p) {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(function ({
      canceled,
      filePaths
    }) {
      if (filePaths) {// 如果有选中
        // 发送选择的对象给子进程
        event.sender.send('selectedItem', filePaths)
      }
      event.sender.send('selectedItem', canceled)
    })
  })
}

module.exports = {
  watcherHandler,
  directoryHandler,
  notifacationHandler
}