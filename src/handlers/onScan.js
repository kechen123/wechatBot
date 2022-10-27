const { log, ScanStatus } = require('wechaty')

const index = async (qrcode, status) => {
  //启动
  if (status === ScanStatus.Waiting && qrcode) {
    const qrcodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrcode)].join('')

    log.info(`onScan: ${ScanStatus[status]}(${status})`)

    log.info('\n==================================================================')
    log.info('\n* Two ways to sign on with qr code')
    log.info('\n1. Scan following QR code:\n')

    require('qrcode-terminal').generate(qrcode, { small: true }) // show qrcode on console

    log.info(`\n2. Or open the link in your browser: ${qrcodeImageUrl}`)
    log.info('\n==================================================================\n')
  } else {
    log.info(`onScan: ${ScanStatus[status]}(${status})`)
  }
}

module.exports = index
