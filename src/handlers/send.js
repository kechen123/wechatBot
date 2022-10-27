/**
 * 统一触发加群欢迎词
 * @param room 群
 * @param roomName 群名
 * @param contactName 进群人
 * @param msg 消息
 */
async function addRoomWelcomeSay(room, roomName, contactName, msg) {
  if (msg.type === 1 && msg.content !== '') {
    // 文字
    console.log('回复内容', msg.content)
    await room.say(`${roomName}：欢迎新朋友 @${contactName}，\n${msg.content}`)
  } else if (msg.type === 2 && msg.url !== '') {
    // url文件
    let obj = FileBox.fromUrl(msg.url)
    console.log('回复内容', obj)
    await room.say(obj)
  }
}

/**
 * 群关键词回复
 * @param {*} contact
 * @param {*} msg
 * @param {*} isRoom
 */
async function roomSay(room, contact, msg) {
  console.log('msg', msg)
  const config = await allConfig()
  const { role } = config.userInfo
  if (msg.id && role === 'vip') {
    msg = await getMaterial(msg.id)
  }
  try {
    if (msg.type === 1 && msg.content) {
      // 文字
      console.log('回复内容', msg.content)
      contact ? await room.say(msg.content, contact) : await room.say(msg.content)
    } else if (msg.type === 2 && msg.url) {
      // url文件
      let obj = FileBox.fromUrl(msg.url)
      console.log('回复内容', obj)
      contact ? await room.say('', contact) : ''
      await delay(500)
      await room.say(obj)
    } else if (msg.type === 3 && msg.url) {
      // bse64文件
      let obj = FileBox.fromDataURL(msg.url, 'room-avatar.jpg')
      contact ? await room.say('', contact) : ''
      await delay(500)
      await room.say(obj)
    } else if (msg.type === 4 && msg.url && msg.title && msg.description) {
      let url = new this.UrlLink({
        description: msg.description,
        thumbnailUrl: msg.thumbUrl,
        title: msg.title,
        url: msg.url,
      })
      console.log(url)
      await room.say(url)
    } else if (msg.type === 5 && msg.appid && msg.title && msg.pagePath && msg.description && msg.thumbUrl && msg.thumbKey) {
      let miniProgram = new this.MiniProgram({
        appid: msg.appid,
        title: msg.title,
        pagePath: msg.pagePath,
        description: msg.description,
        thumbUrl: msg.thumbUrl,
        thumbKey: msg.thumbKey,
      })
      await room.say(miniProgram)
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
async function contactSay(contact, msg, isRoom = false) {
  console.log('msg', msg)
  const config = await allConfig()
  const { role } = config.userInfo
  if (msg.id && role === 'vip') {
    msg = await getMaterial(msg.id)
  }
  try {
    if (msg.type === 1 && msg.content) {
      // 文字
      console.log('回复内容', msg.content)
      await contact.say(msg.content)
    } else if (msg.type === 2 && msg.url) {
      // url文件
      let obj = FileBox.fromUrl(msg.url)
      await obj.ready()
      console.log('回复内容', obj)
      if (isRoom) {
        await contact.say(`@${contact.name()}`)
        await delay(500)
      }
      await contact.say(obj)
    } else if (msg.type === 3 && msg.url) {
      // bse64文件
      let obj = FileBox.fromDataURL(msg.url, 'user-avatar.jpg')
      await contact.say(obj)
    } else if (msg.type === 4 && msg.url && msg.title && msg.description && msg.thumbUrl) {
      let url = new this.UrlLink({
        description: msg.description,
        thumbnailUrl: msg.thumbUrl,
        title: msg.title,
        url: msg.url,
      })
      await contact.say(url)
    } else if (msg.type === 5 && msg.appid && msg.title && msg.pagePath && msg.description && msg.thumbUrl && msg.thumbKey) {
      let miniProgram = new this.MiniProgram({
        appid: msg.appid,
        title: msg.title,
        pagePath: msg.pagePath,
        description: msg.description,
        thumbUrl: msg.thumbUrl,
        thumbKey: msg.thumbKey,
      })
      await contact.say(miniProgram)
    }
  } catch (e) {
    console.log('私聊发送消息失败', e)
  }
}

const send = async (bot, msg) => {}

module.exports = send
