let app = getApp();
Page({
    _data:{
        pageIndex:1,
        pageSize:10,
        total:''
    },
    data: {
        blessingList: ''
    },
    onLoad: function onLoad(options) {
        // 生命周期函数--监听页面加载
        app.Hq.beforeSend('数据加载中');
        let _that=this;
        _that.getBlessingList();
    },

    // 获取祝福列表数据
    getBlessingList() {
        let _that = this;
        wx.cloud.callFunction({
            name: 'getList',
            data: {
                pageIndex:_that._data.pageIndex,
                pageSize:_that._data.pageSize
            }
        }).then((res) => {
            let data=res.result;
            console.log(res);
           if(data.Success){
            app.Hq.afterSend();
            data.res.data.forEach((item) => {
                item.createTime=(app.Hq.GMTToStr(item.createTime)).substring(0,10);
            });
            _that._data.total=data.total
            _that.setData({
                blessingList:data.res.data,
            })
            console.log(_that.data.blessingList);
           }
        })
    },

    onReachBottom: function onReachBottom() {
        let _that=this;
       ++_that._data.pageIndex;
        if(_that._data.pageIndex<_that._data.total/_that._data.pageSize){
            _that.getBlessingList();
        }
    }
});