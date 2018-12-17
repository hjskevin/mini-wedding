class Hq{
    GMTToStr(time){
        let date = new Date(time)
        let Str=date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' + 
        date.getDate() + ' ' + 
        date.getHours() + ':' + 
        date.getMinutes() + ':' + 
        date.getSeconds()
        return Str
    }

    beforeSend(msg){
        wx.showLoading({
            title:msg,
            mask:true
        })
    }

    afterSend(){
        wx.hideLoading()
    }
}

module.exports=new Hq;