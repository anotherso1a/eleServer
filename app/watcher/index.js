const config = require('../config')
const { CronJob } = require('cron')
const fs = require('fs-extra')
const path = require('path')
const moment = require('moment')
const screenshot = require('../screenshot')
const sendLog = require('./sendLog')
const { toPosix } = require('../utils')



const URLS = config.urls

const run = async (detail) => {
  let index = 0
  while (index < URLS.length) {
    let item = URLS[index++]
    const dir = toPosix(path.resolve(detail.savingPath, `images/${item.name}`))
    fs.ensureDirSync(dir)
    const imgPath = toPosix(path.resolve(dir, `${moment(new Date).format('YYYYMMDD_hhmm')}.png`))
    let err = await screenshot({
      url: item.link,
      name: imgPath,
      wait: detail.wait
    })
    err ? sendLog(`[${moment(new Date).format('MM-DD hh:mm:ss')}] screenshot Error: ${err}`) : sendLog(`截图成功：${imgPath}`)
  }
  return
}


let job

const createCron = (config) => {
  return new CronJob(`0 */${config.time} * * * *`, async () => {
    sendLog(`[${moment(new Date).format('YYYY-MM-DD hh:mm')}] start screenshot...`)
    await run(config)
  }, null, false)
}



module.exports = {
  start(detail) {
    sendLog('开始监听...')
    sendLog(`文件存储位置为：${detail.savingPath}`)
    sendLog(`每次截图等待加载时长为：${detail.wait / 1000}秒`)
    sendLog(`每次截图间隔为：${detail.time}分钟...`)
    job = createCron(detail)
    job.start()
  },
  stop() {
    sendLog('停止监听')
    job.stop()
  }
}