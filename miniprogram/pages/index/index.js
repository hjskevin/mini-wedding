let app = getApp();
var innerAudioContext = wx.createInnerAudioContext();
let t;
Page({
  data: {
    IsPlay: false
  },
  onLoad: function onLoad(options) {
    // 生命周期函数--监听页面加载
    app.Hq.beforeSend('数据加载中');
    var _that = this;
    _that.open();
    innerAudioContext.onPlay(function (res) {
      console.log('开始播放');
    });
    innerAudioContext.onPause(function (res) {
      console.log('暂停播放');
    });
  },

  onReady: function onReady() {
    // 生命周期函数--监听页面初次渲染完成
  },

  onShow() {
    // 生命周期函数--监听页面显示
    clearTimeout(t);
    t = setTimeout(() => {
      app.Hq.afterSend();
    }, 3000)
  },

  getOpenId: function getOpenId() {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: function success(res) {
        // console.log(res.result.openid);
      }
    });
  },

  getInfo: function getInfo() {
    wx.cloud.callFunction({
      name: 'messageList',
      data: {}
    }).then(function (res) {
      console.log(res);
    }).catch(console.error);
  },

  close: function close() {
    var _that = this;
    innerAudioContext.src = 'https://wedding-8cb59d.tcb.qcloud.la/music/marryyou.mp3?sign=a49113c2c3117ce1079063a5d35714b0&t=1544969647';
    innerAudioContext.pause();
    _that.setData({
      IsPlay: false
    });
  },

  open: function open() {
    var _that = this;
    innerAudioContext.autoplay = true;
    // innerAudioContext.volume = 0.5;
    innerAudioContext.src = 'https://wedding-8cb59d.tcb.qcloud.la/music/marryyou.mp3?sign=a49113c2c3117ce1079063a5d35714b0&t=1544969647';
    innerAudioContext.play();
    _that.setData({
      IsPlay: true
    });
  },

  onReachBottom: function onReachBottom() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function onShareAppMessage() {
    // 用户点击右上角分享
    return {
      title: '张向荣&倪宏宇邀请您参加他们的婚礼了。。。', // 分享标题
      path: '/pages/index/index', // 分享路径
      imageUrl: 'https://wedding-8cb59d.tcb.qcloud.la/images/8.png?sign=88a7e42c855af3864aecd1af5294002c&t=1544966615'
    };
  }
});