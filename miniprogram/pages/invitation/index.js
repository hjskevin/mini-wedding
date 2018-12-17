const app = getApp();
Page({
  data: {},
  
  onLoad: function onLoad(options) {
    let _that=this;
    // 生命周期函数--监听页面加载
    if(app.globalData.userInfo!==undefined){
      _that.setData({
        nickName:app.globalData.userInfo.nickName
      })
    }
    this.setData({
      showBtn: app.globalData.getAuth,
    });
  },


  onShow: function onShow() {
     // 判断是否授权
    let self=this;
    if(app.globalData.getAuth){
      self.setData({
        showBtn:true,
        nickName:app.globalData.userInfo.nickName
      })
    }else{
      self.setData({
        showBtn:false
      })
    }
  },

  //获取用户信息并上传云数据库
  getInfo(event){
    let _that=this;
   if(event.detail.errMsg==='getUserInfo:ok'){
     app.globalData.getAuth=true;
    app.globalData.userInfo=event.detail.userInfo;
    _that.setData({
      nickName:event.detail.userInfo.nickName,
      showBtn:true
    })
    wx.cloud.callFunction({
      name:'login',
      data:{
        info:event.detail.userInfo
      }
    }).then((res)=>{
      console.log(res);
    }).catch(console.error);
   }
  },

  // 打开地图
  GoToMan: function GoToMan() {
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function success(res) {
        wx.openLocation({ //使用微信内置地图查看位置。
          "latitude": 31.975356,
          "longitude": 121.323426,
          "name": "南通海门市树勋镇云龙村二组",
          "address": '南通海门市余东镇富民村二十七组三号',
          "scale": 28
        });
      }
    });
  },

  // 打开地图
  GoToWoman: function GoToWoman() {
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function success(res) {
        wx.openLocation({ //使用微信内置地图查看位置。
          "latitude": 32.305889,
          "longitude": 121.326413,
          "name": "南通如东县大豫镇豫东村",
          "address": '南通如东县大豫镇豫东村团结六组',
          "scale": 28
        });
      }
    });
  },
});
