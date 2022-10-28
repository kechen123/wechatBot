//需要安装request模块
const fetch = require('node-fetch')
const { log } = require('wechaty')

const api = async (msg = 'robot') => {
  const params = new URLSearchParams()
  params.append('key', G.config.tianApiKey)
  params.append('question', msg)
  log.info('请求机器人参数:', msg)
  return await fetch('http://api.tianapi.com/robot/index', {
    method: 'POST',
    body: params,
    // header: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // },
    // headers: { 'Content-Type': 'application/json' },
  })
}

const robot = async (msg) => {
  const res = await api(msg)
  const data = await res.json()
  log.info('机器人返回数据:', JSON.stringify(data))
  if (data.code == 200) {
    return data.newslist[0].reply.replaceAll('<br>', '\n')
  }
  return '狗蛋不知道你在说什么'
}

module.exports = robot
