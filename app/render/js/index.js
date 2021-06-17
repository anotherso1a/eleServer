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
  let savingPath = ''
  $("#start").addEventListener('click', function () {
    if(!savingPath) return alert('请选择文件存储位置！')
    isRunning = !isRunning
    if (isRunning) {
      ipcRenderer.invoke('watchControl', {
        type: 'start',
        detail: {
          savingPath,
          time: $('#time').value,
          wait: $('#wait').value
        }
      })
      this.innerText = '运行中...'
    } else {
      ipcRenderer.invoke('watchControl', { type: 'stop' })
      this.innerText = '开始监测'
    }
  })
  $("#open").addEventListener('click', function () {
    ipcRenderer.once('selectedItem', (e, v) => {
      if (v && v[0]) {
        savingPath = v[0]
        this.value = savingPath
        console.log(v[0])
      } else {
        console.log('canceled')
      }
    })
    ipcRenderer.send('open-directory-dialog')
  })
})