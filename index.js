const { log, WechatyBuilder, ScanStatus } = require('wechaty')
const onScan = require('./src/handlers/onScan')
const onLogin = require('./src/handlers/onLogin')
const onMessage = require('./src/handlers/onMessage')

//抽签
//https://wap.99166.com/phoneapp/czsm/384.html

const name = 'wechat-assistant'
const bot = WechatyBuilder.build({
  name, // generate xxxx.memory-card.json and save login data for the next login
  puppet: 'wechaty-puppet-wechat',
  puppetOptions: {
    uos: true,
  },
})
bot.on('scan', onScan).on('login', onLogin).on('message', onMessage)
bot.start().then(() => {
  log.info('bot.Message.Type.Text>>>', bot)
  Object.assign(global, { G: bot })
})
