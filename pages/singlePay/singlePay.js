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
  
  for (let i = 0; i < pintuanOrdersList.length; i++) {
    landscapepintuanOrdersList.push({
      detail: pintuanOrdersList[i],
      count: pintuanOrdersIndexList[i].count
    })
   // allTotal = allTotal + pintuanOrdersList[i].landscapePrice * pintuanOrdersIndexList[i].count;
   allTotal=pintuanOrdersList[i].landscapePrice
  }
 // console.log(allTotal);
  this.setData({
    landscapepintuanOrdersList: landscapepintuanOrdersList,
    allTotal: allTotal
  })
},
payOrder:function(){
  var that=this;
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
