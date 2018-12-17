// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // 先取出集合记录总数
  const countResult = await db.collection('Info').count()
  const total = countResult.total
  return db.collection('Info').skip((event.pageIndex-1)*event.pageSize).limit(event.pageSize).get().then((res) => {
    return {res,Success:true,Code:200,total};
  })
}