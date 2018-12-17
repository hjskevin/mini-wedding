// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'wedding-8cb59d'
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID } = cloud.getWXContext();
  let user_info = await db.collection('Info').where({
    _openid: OPENID
  }).get()
  if (user_info.data.length === 0) {
    return db.collection('Info').add({
      data: { nickName: event.nickName, avatar: event.avatar, value: event.content, _openid: OPENID, createTime: db.serverDate() }
    }).then((res) => {
      return {res,Success:true,Code:0};
    })
  } else {
    return db.collection('Info').doc(user_info.data._openid).update({
      data: { nickName: event.nickName, avatar: event.avatar, value: event.content, createTime: db.serverDate() }
    }).then((res) => {
      return {res,Success:true,Code:0};
    })
  }
}