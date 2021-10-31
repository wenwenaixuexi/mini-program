var jsonData = require('../json.js');
console.log(jsonData.dataList[1].name);
Page({
  data: {
    viewTop: 0,
    viewLeft: 0,
    windowHeight: '',
    windowWidth: '',
    viewrgba: "rgb(102, 102, 102);",
    imgurl: "../../../../../images/icon_play.png",
    isShow: true,
    isMove: false,
    isChange: false,

  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          dataList: jsonData.dataList[1],
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          viewTop: res.windowHeight * 0.9 - 50,
          viewLeft: res.windowWidth * 0.05
        })
      }
    })
  },
  pintuan:function(){
    wx.navigateTo({
      url: '../../../../../pages/home/home',
    })
  }

})