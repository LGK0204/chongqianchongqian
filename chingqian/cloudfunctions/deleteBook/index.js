const cloud = require('wx-server-sdk')
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('todos').where({
      // 条件
    }).remove()
  } catch(e) {
    console.error(e)
  }
}