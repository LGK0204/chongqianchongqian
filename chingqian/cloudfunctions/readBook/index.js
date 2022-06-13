// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const fileID = 'cloud://cloud1-0g969ggs31e658ac.636c-cloud1-0g969ggs31e658ac-1309479295/book_file/' + event.bookName + '.txt'
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = res.fileContent
  return buffer.toString('utf8',event.readStart,event.readStart+event.readStep)
}