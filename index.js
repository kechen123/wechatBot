const { log, WechatyBuilder, ScanStatus } = require('wechaty')
const LOGPRE = '[PadLocalDemo]'
const name = 'wechat-assistant'
const bot = WechatyBuilder.build({
  name, // generate xxxx.memory-card.json and save login data for the next login
  puppet: 'wechaty-puppet-wechat',
  puppetOptions: {
    uos: true,
  },
})
bot
  .on('scan', (qrcode, status) => {
    //启动
    if (status === ScanStatus.Waiting && qrcode) {
      const qrcodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrcode)].join('')

      log.info(LOGPRE, `onScan: ${ScanStatus[status]}(${status})`)

      log.info('\n==================================================================')
      log.info('\n* Two ways to sign on with qr code')
      log.info('\n1. Scan following QR code:\n')

      require('qrcode-terminal').generate(qrcode, { small: true }) // show qrcode on console

      log.info(`\n2. Or open the link in your browser: ${qrcodeImageUrl}`)
      log.info('\n==================================================================\n')
    } else {
      log.info(LOGPRE, `onScan: ${ScanStatus[status]}(${status})`)
    }
  })
  .on('login', (user) => log.info(`User ${user} logged in`))
  .on('message', (message) => log.info(`Message: ${message}`))
bot.start()
