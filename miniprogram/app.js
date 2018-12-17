//app.js
const Hq=require('./utils/util.js');
App({
  Hq:Hq,
  onLaunch: function () {
    let _that=this;
    wx.getSetting({
      success:(res)=>{
        if(res.authSetting['scope.userInfo']){
          _that.globalData.getAuth=true;
          wx.getUserInfo({
            success(res){
              _that.globalData.userInfo=res.userInfo;
            }
          })
        }else{
          _that.globalData.getAuth=false;
        }
      }
    })

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {}
  },

  globalData:{
    getAuth:'',
    userInfo:''
  }
})
