const config = require('../../config.js')
const { $ } = require('../utils/index')
const { ipcRenderer } = require('electron')
const log = require('./log.js')


window.addEventListener('DOMContentLoaded', () => {
  // init listener
  log()
  // init value
  $('#urls').value = config.urls.map(e => e.link).join('\n')
  $('#time').value = config.time
  $('#wait').value = config.wait
  // event binding
  let isRunning = false
  $("#start").addEventListener('click', function () {
    isRunning = !isRunning
    if (isRunning) {
      ipcRenderer.invoke('watchControl', {
        type: 'start',
        detail: {
          time: $('#time').value,
          wait: $('#wait').value
        }
      })
      this.innerText = '运行中...'
    } else {
      ipcRenderer.invoke('watchControl', {type: 'stop'})
      this.innerText = '开始监测'
    }
  })
})