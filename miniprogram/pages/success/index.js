"use strict";

Page({
  data: {},
  onLoad: function onLoad(options) {
    // 生命周期函数--监听页面加载
  },
  onReady: function onReady() {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function onShow() {
    // 生命周期函数--监听页面显示
  },
  viewAdress: function viewAdress() {
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function success(res) {
        wx.openLocation({
          "latitude": 31.975356, // 纬度，范围为-90~90，负数表示南纬
          "longitude": 121.323426, // 经度，范围为-180~180，负数表示西经
          "scale": 28, // 缩放比例
          "name": '张向荣的家', // 位置名
          "address": '南通海门市余东镇富民村二十七组三号' // 地址的详细说明
        });
      }
    });
  },

  viewMessageList(){
    wx.navigateTo({
      url:'../more/index'
    })
  },
  onHide: function onHide() {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function onUnload() {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function onPullDownRefresh() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function onReachBottom() {
    // 页面上拉触底事件的处理函数
  }
});
//# sourceMappingURL=index.js.map
