var app = getApp();
var globalData = app.globalData;
Page({
  _data: {
    textValue: '',
    pageIndex: 1,
    pageSize: 10
  },
  data: {
    blessingList: ''
  },
  /**
   * 页面加载
   */
  onLoad: function onLoad(options) {},

  onShow() {
    let _that = this;
    _that.judgeAuth();
    _that.getBlessingList();
  },

  // 判断是否授权
  judgeAuth() {
    let self = this;
    if (globalData.getAuth) {
      self.setData({
        auth: true
      })
    } else {
      self.setData({
        auth: false
      })
    }
  },

  // 获取祝福列表数据
  getBlessingList() {
    let _that = this;
    app.Hq.beforeSend('数据加载中');
    wx.cloud.callFunction({
      name: 'getList',
      data: {
        pageIndex: _that._data.pageIndex,
        pageSize: _that._data.pageSize
      }
    }).then((res) => {
      let data = res.result;
      if (data.Success) {
        app.Hq.afterSend();
        data.res.data.forEach((item) => {
          item.createTime = (app.Hq.GMTToStr(item.createTime)).substring(0, 10);
        });
        _that.setData({
          blessingList: data.res.data.slice(0, 5)
        })
        console.log(_that.data.blessingList);
      }
    })
  },

  // 获取用户信息
  getUserInfo(event) {
    let _that = this;
    if (event.detail.errMsg === 'getUserInfo:ok') {
      globalData.userInfo = event.detail.userInfo;
      globalData.getAuth = true;
      _that.setData({
        auth: true
      })
      wx.cloud.callFunction({
        name: 'login',
        data: {
          info: event.detail.userInfo
        }
      }).then((res) => {
        console.log(res)
      }).catch(console.error);
    }
  },

  /**
   * 获取textarea输入值
   */
  getTextAreaValue(event) {
    var _that = this;
    _that._data.textValue = event.detail.value;
    console.log(_that._data.textValue);
  },

  /**
   * 提交数据
   */
  submit() {
    let _that = this;
    app.Hq.beforeSend('提交中');
    if (_that._data.textValue === '') {
      wx.showModal({
        title: '',
        content: '请输入内容！'
      });
    } else {
      wx.cloud.callFunction({
        name: 'addBlessing',
        data: {
          nickName: globalData.userInfo.nickName,
          avatar: globalData.userInfo.avatarUrl,
          content: _that._data.textValue
        }
      }).then(function (res) {
        if (res.result.Success) {
          app.Hq.afterSend();
          wx.navigateTo({
            url: '../success/index'
          });
        } else {
          wx.showToast({
            title: res,
            icon: 'none',
            duration: 3000
          })
        }
      });
    }
  },

});