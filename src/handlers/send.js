/**
 * 群关键词回复
 * @param {*} contact
 * @param {*} msg
 * @param {*} isRoom
 */
async function roomSay(contact, room, msg) {
  try {
    if (msg.content) {
      // 文字
      console.log('回复内容', msg.content)
      msg.mentionSelf ? await room.say(msg.content, contact) : await room.say(msg.content)
    }
  } catch (e) {
    console.log('群回复错误', e)
  }
}

/**
 * 私聊发送消息
 * @param contact
 * @param msg
 * @param isRoom
 *  type 1 文字 2 图片url 3 图片base64 4 url链接 5 小程序  6 名片
 */
async function friendSay(contact, msg, isRoom = false) {
  try {
    if (msg.content) {
      // 文字
      console.log('回复内容', msg.content)
      await contact.say(msg.content)
    }
  } catch (e) {
    console.log('私聊发送消息失败', e)
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
