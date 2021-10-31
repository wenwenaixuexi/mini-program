// pages/pintuanOrdersList/pintuanOrdersList.js
var showData=require("../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    landscapepintuanOrdersList:[],
    allTotal:0,

      Y:'',
      M:'',
      D:'',
      h:'',
      m:'',
      s:''
  
  
  },
  onReady:function(){
    var timestamp = Date.parse(new Date());  
    var pintuanOrdersIndexList = wx.getStorageSync("pintuanOrdersList");
    var pintuanOrdersList =[];
    var landscapepintuanOrdersList = [];
    var allTotal = 0;
    var flag=1;
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
     for (let i = 0; i < pintuanOrdersIndexList.length; i++) {
      flag=pintuanOrdersIndexList[i].flag

      if(flag==1){
      console.log(flag)
      console.log("这是单独购买");
      pintuanOrdersList=  showData.getlandscapeListByIndex(pintuanOrdersIndexList)

          landscapepintuanOrdersList.push({
            detail: pintuanOrdersList[i],
            count: pintuanOrdersIndexList[i].count,
          })
          allTotal = allTotal + pintuanOrdersList[i].landscapePrice * pintuanOrdersIndexList[i].count;
        }

      

     }
   // console.log(allTotal);

    this.setData({
      landscapepintuanOrdersList: landscapepintuanOrdersList,
      allTotal: allTotal,
    Y:Y,
    M: M,
    D:D,
    h:h,
    m:m,
    s:s
    })
  
  },

  
  onshow:function(){
      //获取当前时间戳  
 
 
  
  },
  //处理加和减的操作
  oper:function(event){
    var isDelete=false;
   // console.log(event);
    var index = event.currentTarget.dataset.index;
    var count=this.data.landscapepintuanOrdersList[index].count;
    var temp = "landscapepintuanOrdersList[" + index + "].count";
    if(event.currentTarget.dataset.type=='+'){ 
      this.setData({
        [temp]:++count
      })
    }else{
      if(count>1){
        this.setData({
          [temp]: --count
        })
      }else{
        isDelete=true;//用于标记该商品需要被删除
      }
    }
    var that=this;
    var pintuanOrdersList=wx.getStorageSync("pintuanOrdersList");
    if(isDelete){
      wx.showModal({
        title: '提示',
        content: '您是否要将该订单删除',
        success:function(res){
          if(res.confirm){
            var newpintuanOrdersel=[];
            //pintuanOrdersList.splice(index,1);
            for(let i=0;i<pintuanOrdersList.length;i++){
              if(i!=index){
                newpintuanOrdersel.push(pintuanOrdersList[i]);
              }
              
            }
            wx.setStorageSync("pintuanOrdersList", newpintuanOrdersel);
            that.getNewPage();
          }
        }
      })
    }else{
      pintuanOrdersList[index].count = count;
      wx.setStorageSync("pintuanOrdersList", pintuanOrdersList);
      var allTotal = 0;
      var landscapepintuanOrdersList = this.data.landscapepintuanOrdersList;

      for (let i = 0; i < landscapepintuanOrdersList.length; i++) {
        allTotal += landscapepintuanOrdersList[i].detail.landscapePrice * landscapepintuanOrdersList[i].count;
      }
      this.setData({
        allTotal: allTotal
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  getNewPage:function(){
    var pintuanOrdersIndexList = wx.getStorageSync("pintuanOrdersList");
    var pintuanOrdersList = showData.getlandscapeListByIndex(pintuanOrdersIndexList);
    var landscapepintuanOrdersList = [];
    var allTotal = 0;
    
    for (let i = 0; i < pintuanOrdersIndexList.length; i++) {
      landscapepintuanOrdersList.push({
        detail: pintuanOrdersList[i],
        count: pintuanOrdersIndexList[i].count
      })
      allTotal = allTotal + pintuanOrdersList[i].landscapePrice * pintuanOrdersIndexList[i].count;
    }
    this.setData({
      landscapepintuanOrdersList: landscapepintuanOrdersList,
      allTotal: allTotal
    })
  },


})