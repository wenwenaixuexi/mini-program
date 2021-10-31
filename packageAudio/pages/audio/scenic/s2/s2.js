// pages/pintuanOrdersList/pintuanOrdersList.js
var showData=require("../../../../../utils/data.js");
var jsonData = require('../json.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    landscapepintuanOrdersList:[],
 
  
  },
  onReady:function(){

    var pintuanOrdersIndexList = wx.getStorageSync("pintuanOrdersList");
    var pintuanOrdersList = [];
    var landscapepintuanOrdersList = [];
   var flag;
  
     for (let i = 0; i < pintuanOrdersIndexList.length; i++) {
      flag = pintuanOrdersIndexList[i].flag
      if(flag==1){
        console.log(flag);
        console.log("这是单独购买");
        pintuanOrdersList = showData.getlandscapeListByIndex(pintuanOrdersIndexList)
  
          landscapepintuanOrdersList.push({
            detail: pintuanOrdersList[i],
            count: pintuanOrdersIndexList[i].count,
          })
          
        }
     
     }
    
  },
  
  onshow:function(){
      //获取当前时间戳  
  
  },
jinian:function(){
wx.switchTab({
  url: '../../../../../pages/index/index',
})
},
  onLoad: function (options) {

   var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        //console.log('height=' + res.windowHeight);
       // console.log('width=' + res.windowWidth);
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

  
 

})
