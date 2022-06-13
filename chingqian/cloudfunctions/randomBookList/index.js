// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var randomKey = Math.floor(Math.random() * (100 - 1)) + 1;
  var res = []
  res.push((await db.collection('dushi').where({
    ID: randomKey,
  }).get()).data[0])
  res.push((await db.collection('kehuan').where({
    ID: randomKey,
  }).get()).data[0])
  res.push((await db.collection('lishi').where({
    ID: randomKey,
  }).get()).data[0])
  res.push((await db.collection('qita').where({
    ID: randomKey,
  }).get()).data[0])
  res.push((await db.collection('xianxia').where({
    ID: randomKey,
  }).get()).data[0])
  res.push((await db.collection('xuanhuan').where({
    ID: randomKey,
  }).get()).data[0])
  res.push((await db.collection('yanqing').where({
    ID: randomKey,
  }).get()).data[0])
  res.push((await db.collection('youxi').where({
    ID: randomKey,
  }).get()).data[0])
  return res
}