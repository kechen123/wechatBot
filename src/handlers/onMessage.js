const { log } = require('wechaty')
const { authorityRoom, authorityFriend } = require('../utils/permission')
const service = require('../service')
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

//是否@自己
const mentionSelf = async (msg) => {
  let text = msg.text()
  // const mentionSelf = await msg.mentionSelf() // @自己
  let mentionSelf = text.includes(`@${G.config.wechatName}`)

  if (mentionSelf) {
    text = text.replace(/@[^,，：:\s@]+/g, '').trim()
  }
  if (text.indexOf(G.config.robotName) > -1) {
    mentionSelf = true
    text = text.replace(G.config.robotName, '').trim()
  }
  return { boo: mentionSelf, text }
}

//群聊回复
const getRoomMessage = async (msg) => {
  const room = msg.room() // 是否为群消息
  const roomName = await room.topic()
  const mSelf = await mentionSelf(msg) // @自己
  let text = mSelf.text
  if (mSelf.boo) {
    text = text.replace(/@[^,，：:\s@]+/g, '').trim()
  }
  const sendMsg = {
    type: 1,
    room: true,
    mSelf: mSelf.boo,
  }
  if (!mSelf) {
    return
  }
  if (text.indexOf('图片') > -1) {
    sendMsg.type = 2
    // sendMsg.url = resolve(__dirname, 'src/assets/image/1.png')
    sendMsg.url = '*本地*./src/assets/image/1.png'
  } else {
    sendMsg.content = await service(text)
  }

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
  const mSelf = await mentionSelf(msg) // @自己
  const b = (await checkMsg(G.bot, msg)) ?? false
  const room = msg.room() // 是否为群消息
  //自己给自己发消息 消息当前是否可以回复 群聊必须@自己
  if (msgSelf || !b || (room && !mSelf.boo)) return

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
