const { log } = require('wechaty')

const index = async (user) => {
  try {
    log.info(`贴心助理${user}登录了`)
    const payload = user.payload || user._payload
  } catch (error) {}
}

module.exports = index
