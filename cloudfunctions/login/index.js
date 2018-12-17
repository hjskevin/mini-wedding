// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  env: 'wedding-8cb59d'
})

const db = cloud.database();
exports.main = async (event, context) => {
  let { OPENID } = cloud.getWXContext();
  let { info } = event;
  let user_info = await db.collection('user').where({
    _openid: OPENID
  }).get();
  if (user_info.data.length === 0) {
    return db.collection('user').add({
      data: { ...info, _openid: OPENID }
    }).then((res)=>{
      return res;
    })
  } else {
    return db.collection('user').doc(user_info.data._openid).update({
      data: { ...info }
    }).then((res)=>{
      return res;
    })
  }
}