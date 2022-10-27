/**
 * 消息是否有权限
 */

//群
const authorityRoom = () => {
  return true
}

//私聊
const authorityFriend = () => {
  return true
}

module.exports = {
  authorityRoom,
  authorityFriend,
}
