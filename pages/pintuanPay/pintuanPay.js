var showData=require("../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Y:'',
    M:'',
    D:'',
    h:'',
    m:'',
    s:''
  },
onReady:function(){
  var pintuanOrdersIndexList = wx.getStorageSync("pintuanOrdersList");
  var pintuanOrdersList = showData.getlandscapeListByIndex(pintuanOrdersIndexList);
  var landscapepintuanOrdersList = [];
  var allTotal = 0;
 var flag=0;
  for (let i = 0; i < pintuanOrdersList.length; i++) {
    landscapepintuanOrdersList.push({
      detail: pintuanOrdersList[i],
      count: pintuanOrdersIndexList[i].count,
      flag: pintuanOrdersIndexList[i].flag
   
    })
    //console.log(pintuanOrdersList[i]);
   // console.log(flag);
   // console.log(pintuanOrdersList[i].landscapePrice)
    //allTotal = allTotal +* pintuanOrdersIndexList[i].count;
    allTotal= pintuanOrdersList[i].landscapePrice 
  }
 // console.log(allTotal);
  this.setData({
    landscapepintuanOrdersList: landscapepintuanOrdersList,
    allTotal: allTotal*0.75
  })
},
payOrder:function(){
  var that=this;
  var timestamp = Date.parse(new Date());  
  timestamp = timestamp / 1000;  
  // console.log("当前时间戳为：" + timestamp);  
//获取当前时间  
   var n = timestamp * 1000;  
   var date = new Date(n);  
   //年  
   var Y = date.getFullYear();  
   //月  
   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
   //日  
   var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
   //时  
   var h = date.getHours();  
   //分  
   var m = date.getMinutes();  
   //秒  
   var s = date.getSeconds();  
wx.setStorage({
  data: Y-M-D-h-m-s,
  key: 'Y-M-D-h-m-s',
})
var pintuanOrdersIndexList = wx.getStorageSync("pintuanOrdersList");
var pintuanOrdersList = [];
var landscapepintuanOrdersList = [];
var flag;
 for (let i = 0; i < pintuanOrdersIndexList.length; i++) {
 
  pintuanOrdersList = showData.getlandscapeListByIndex(pintuanOrdersIndexList)
  console.log(pintuanOrdersList)
  var scapecode = pintuanOrdersList[i].landscapeCode;
            console.log(scapecode)
            flag = pintuanOrdersIndexList[i].flag
              if(scapecode===1){
                   wx.navigateTo({
                  url: '../../packageAudio/pages/audio/scenic/s1/s1',
                })      
            }else if (scapecode === 2){     
                  wx.navigateTo({
                    url: '../../packageAudio/pages/audio/scenic/s2/s2',
                  })
            }

 }

  
     
}
})
