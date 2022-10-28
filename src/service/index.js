const robot = require('./robot')

const index = async (text) => {
  if (text.trim() == '玩法') {
    return `---------------\n狗蛋讲个笑话\n---------------`
  } else {
    return await robot(text)
  }
}

module.exports = index
