// pages/dingdan/dingdan.js
var showData=require("../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    scrollTop:0,
    page:0,
    groupData:[],
    loading:true,
    landscapepintuanOrdersList:[],
    allTotal:0,

      Y:'',
      M:'',
      D:'',
      h:'',
      m:'',
      s:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function(){
    var timestamp = Date.parse(new Date());  
    var pintuanOrdersIndexList = wx.getStorageSync("pintuanOrdersList");
    var pintuanOrdersList = showData.getlandscapeListByIndex(pintuanOrdersIndexList);
    var landscapepintuanOrdersList = [];
    var allTotal = 0;
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
     
    
    for (let i = 0; i < pintuanOrdersList.length; i++) {
      landscapepintuanOrdersList.push({
        detail: pintuanOrdersList[i],
        count: pintuanOrdersIndexList[i].count
      })
      allTotal = allTotal + pintuanOrdersList[i].landscapePrice * pintuanOrdersIndexList[i].count;
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
   //处理加和减的操作
   oper:function(event){
    var isDelete=false;
    console.log(event);
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
    
    for (let i = 0; i < pintuanOrdersList.length; i++) {
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

 // 滑动切换tab 
 bindChange: function( e ) { 
  this.data.page = 0
  this.data.groupData=[]
  this.data.loading = true
  this.data.currentTab = e.detail.current
  this.setCurrentData()

  this.setData({
   loading:true,
   groupList:[],
    currentTab: this.data.currentTab
  })
 }, 
 // 点击tab切换 
 swichNav: function( e ) {
   if( this.data.currentTab == e.currentTarget.dataset.current ) return;
   this.data.currentTab = e.currentTarget.dataset.current
   this.setData({
     currentTab: this.data.currentTab
   }) 
 },
 swichNavTo1: function() {
  wx.navigateTo({
    url: '../myPintuanOrders/myPintuanOrders'
  })
},
 swichNavTo2: function() {
  wx.navigateTo({
    url: '../mysingleOrders/mysingleOrders'
  })
},
swichNavTo3: function() {
  wx.navigateTo({
    url: '../no-orders/no-orders'
  })
},
 scrolltolower:function(){
  ++this.data.page
  this.setCurrentData()
 },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})