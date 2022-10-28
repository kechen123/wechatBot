const { FileBox } = require('file-box')
const { log } = require('wechaty')

/**
 * 群关键词回复
 * @param {*} contact
 * @param {*} room
 * @param {*} msg
 * type 1 文字 2 图片url 3 音频 4 url链接 5 小程序  6 名片
 */
async function roomSay(contact, room, msg) {
  try {
    if (msg.type === 1 && msg.content) {
      // 文字
      log.info('回复内容', msg.content)
      msg.mentionSelf ? await room.say(msg.content, contact) : await room.say(msg.content)
    } else if (msg.type === 2 && msg.url) {
      // url文件 带 *本地* 路径的为本地路径
      let obj
      if (msg.url.indexOf('*本地*') > -1) {
        obj = FileBox.fromFile(msg.url.replace('*本地*', ''))
      } else {
        obj = FileBox.fromUrl(msg.url)
      }
      log.info('回复内容', obj)
      msg.mentionSelf ? await room.say('', contact) : ''
      await room.say(obj)
    } else if (msg.type === 3 && msg.url) {
    }
  } catch (e) {
    log.info('群回复错误', e)
  }
}

/**
 * 私聊发送消息
 * @param contact
 * @param msg
 * @param isRoom
 *  type 1 文字 2 图片url 3 音频 4 url链接 5 小程序  6 名片
 */
async function friendSay(contact, msg) {
  try {
    if (msg.type === 1 && msg.content) {
      // 文字
      log.info('回复内容', msg.content)
      await contact.say(msg.content)
    } else if (msg.type === 2 && msg.url) {
      // url文件 带 *本地* 路径的为本地路径
      let obj
      if (msg.url.indexOf('*本地*') > -1) {
        obj = FileBox.fromFile(msg.url.replace('*本地*', ''))
      } else {
        obj = FileBox.fromUrl(msg.url)
      }
      log.info('回复内容', obj)
      await contact.say(obj)
    } else if (msg.type === 3 && msg.url) {
    }
  } catch (e) {
    log.info('私聊发送消息失败', e)
  }
}

const send = async (contact, msg, room) => {
  if (msg.room) {
    await roomSay(contact, room, msg)
  } else {
    await friendSay(contact, msg)
  }
}

module.exports = send
