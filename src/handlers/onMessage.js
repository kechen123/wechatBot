const { log } = require('wechaty')
const { authorityRoom, authorityFriend } = require('../utils/permission')
const send = require('./send')

const getMessagePayload = async (message, bot) => {
  let content = ''
  const type = msg.type()
  const contact = msg.talker() // 发消息人
  const isOfficial = contact.type() === that.Contact.Type.Official
  switch (message.type()) {
    case bot.Message.Type.Text:
      content = msg.text()
      if (!isOfficial) {
        console.log(`发消息人${await contact.name()}:${content}`)
      } else {
        console.log('公众号消息')
      }
      break
  }
}

const onMessage = async (msg) => {
  try {
    const msgSelf = msg.self() // 是否自己发给自己的消息
    if (msgSelf) return
    const room = msg.room() // 是否为群消息
    let sendMsg = {}
    if (room) {
      if (await authorityRoom()) {
        return
      }
    } else {
      if (await authorityFriend()) {
        return
      }
    }
    send(this, sendMsg)
  } catch (error) {
    log.info('监听消息失败', error)
  }
}

module.exports = onMessage
