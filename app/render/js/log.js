const { ipcRenderer } = require('electron')
const { $ } = require('../utils/index')

module.exports = () => {
  
  ipcRenderer.on('log', (e, msg) => {
    let p = document.createElement('p')
    p.innerText = msg
    let log = $('#log')
    log.append(p)
    setTimeout(log.scrollTo(0, log.scrollHeight))
  })
}