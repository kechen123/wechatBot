const { log } = require('wechaty')
const index = async (user) => {
  log.info(`用户${user}已登出`)
}
module.exports = index
