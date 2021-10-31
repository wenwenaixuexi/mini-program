//引入本地json数据，这里引入的就是第一步定义的json数据
var jsonData = require('../json.js');
console.log(jsonData.dataList[0].name);
Page({
  data: {
    viewTop: 0,
    viewLeft: 0,
    windowHeight: '',
    windowWidth: '',
    imgurl: "../../../../../images/icon_play.png",
    viewrgba:"rgb(102, 102, 102);",
    isShow: true,
    isMove: false,
    isChange: false,
  },

  onLoad: function (options) {
wx.showToast({
  title: '了解详情',
})
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          dataList: jsonData.dataList[0],
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
