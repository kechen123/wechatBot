const { log, WechatyBuilder, ScanStatus } = require('wechaty')
const onScan = require('./src/handlers/onScan')
const onLogin = require('./src/handlers/onLogin')
const onMessage = require('./src/handlers/onMessage')

const name = 'wechat-assistant'
const bot = WechatyBuilder.build({
  name, // generate xxxx.memory-card.json and save login data for the next login
  puppet: 'wechaty-puppet-wechat',
  puppetOptions: {
    uos: true,
  },
})
bot.on('scan', onScan).on('login', onLogin).on('message', onMessage)
bot.start()
