'use strict';

Page({
  data: {
    region: ['广东省', '广州市', '海珠区']
  },
  onLoad: function onLoad(options) {
    // 生命周期函数--监听页面加载
  },
  onReady: function onReady() {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function onShow() {
    // 生命周期函数--监听页面显示
  },
  /**
   * 获取选择的地区
   */
  changeRegion: function changeRegion() {
    console.log(12);
  },

  /**
   * 提交表单数据
   */
  commitData: function commitData() {},

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
  },
  onShareAppMessage: function onShareAppMessage() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    };
  }
});
//# sourceMappingURL=index.js.map
