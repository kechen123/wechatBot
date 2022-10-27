const { log } = require('wechaty')
const { authorityRoom, authorityFriend } = require('../utils/permission')
const send = require('./send')

//验证消息当前是否可以回复，当前只支持文字
const checkMsg = async (bot, msg) => {
  const type = msg.type()
  const contact = msg.talker() // 发消息人
  let b = false
  switch (type) {
    case bot.Message.Type.Text:
      content = msg.text()
      log.info(`发消息人${await contact.name()}:${content}`)
      b = true
      break
    case bot.Message.Type.Emoticon:
      log.info(`发消息人${await contact.name()}:发了一个表情`)
      break
    case bot.Message.Type.Image:
      log.info(`发消息人${await contact.name()}:发了一张图片`)
      break
    case bot.Message.Type.Url:
      log.info(`发消息人${await contact.name()}:发了一个链接`)
      break
    case bot.Message.Type.Video:
      log.info(`发消息人${await contact.name()}:发了一个视频`)
      break
    case bot.Message.Type.Audio:
      log.info(`发消息人${await contact.name()}:发了一个视频`)
      break
    default:
      break
  }
  return b
}

//群聊回复
const getRoomMessage = async (msg) => {
  const room = msg.room() // 是否为群消息
  const roomName = await room.topic()
  let text = msg.text()
  // const mentionSelf = await msg.mentionSelf() // @自己
  const mentionSelf = text.includes(`@。`)
  if (mentionSelf) {
    text = text.replace(/@[^,，：:\s@]+/g, '').trim()
  }
  const sendMsg = {
    type: 1,
    room: true,
    mentionSelf,
    content: '',
  }
  sendMsg.content = `-------收到来自群‘${roomName}’的消息-------
  ${text}
  `
  return sendMsg
}

const getFriendMessage = async (msg) => {
  const contact = msg.talker() // 发消息人
  let text = msg.text()
  const name = await contact.name()
  const sendMsg = {
    type: 1,
    room: false,
    content: '',
  }
  sendMsg.content = `-------收到来自${name}的消息-------
  ${text}
  `
  return sendMsg
}

const onMessage = async (msg) => {
  // try {
  const msgSelf = msg.self() // 是否自己发给自己的消息
  const contact = msg.talker() // 发消息人
  const b = (await checkMsg(G, msg)) ?? false
  if (msgSelf || !b) return

  const room = msg.room() // 是否为群消息
  let sendMsg = {}
  if (room) {
    if (await authorityRoom()) {
      sendMsg = await getRoomMessage(msg)
    } else {
      return
    }
  } else {
    if (await authorityFriend()) {
      sendMsg = await getFriendMessage(msg)
    } else {
      return
    }
  }
  await send(contact, sendMsg, room)
  // } catch (error) {
  //   log.info('监听消息失败', error)
  // }
}

module.exports = onMessage
