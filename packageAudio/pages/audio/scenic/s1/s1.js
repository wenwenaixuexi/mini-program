// pages/pintuanOrdersList/pintuanOrdersList.js
var jsonData = require('../json.js');
var showData=require("../../../../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    landscapepintuanOrdersList:[],
    allTotal:0,

 
  
  
  },
  onReady:function(){
    var timestamp = Date.parse(new Date());  
    var pintuanOrdersIndexList = wx.getStorageSync("pintuanOrdersList");
    var pintuanOrdersList = [];
    var landscapepintuanOrdersList = [];
    var allTotal = 0;
    var flag;

     for (let i = 0; i < pintuanOrdersIndexList.length; i++) {
      flag = pintuanOrdersIndexList[i].flag
     

        pintuanOrdersList = showData.getlandscapeListByIndex(pintuanOrdersIndexList)
  
          landscapepintuanOrdersList.push({
            detail: pintuanOrdersList[i],
            count: pintuanOrdersIndexList[i].count,
          })
          
          allTotal = allTotal + pintuanOrdersList[i].landscapePrice * pintuanOrdersIndexList[i].count;
       
     
     }
    
   
   // console.log(allTotal);

      this.setData({
          landscapepintuanOrdersList: landscapepintuanOrdersList,
          allTotal: allTotal,
  
        })

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
wx.showToast({
  title: '观看直播',
})
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
