const { log, WechatyBuilder, ScanStatus } = require('wechaty')
const { PuppetPadlocal } = require('wechaty-puppet-padlocal')
const config = require('./config')
const onScan = require('./src/handlers/onScan')
const onLogin = require('./src/handlers/onLogin')
const onMessage = require('./src/handlers/onMessage')

//抽签
//https://wap.99166.com/phoneapp/czsm/384.html
// log.level('silly')
const token = 'puppet_padlocal_97684c5548f94c7faa8f9dfaa7076c57'
const puppet = new PuppetPadlocal({
  token,
})
const bot = WechatyBuilder.build({
  name: 'BotName',
  puppet,
})
bot.on('scan', onScan).on('login', onLogin).on('message', onMessage)
bot.start().then(() => {
  log.info('bot.Message.Type.Text>>>', bot)
  Object.assign(global, { G: { bot, config } })
})
