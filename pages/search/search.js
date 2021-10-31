// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{
      name: "旅游推荐",
      icon: "../../images/tuijian.png",
      page: "../publish/publish"
    },
    {
      name: "景区选择",
      icon: "../../images/detail.png",
      page: "../../pages/destination/destination"
    },

   ]
  },
//特色活动
  toTravel:function (event) {
wx.navigateTo({
  url: '../../pages/footprint/footprint',
})
  },
    //优惠券
    Coupon: function (event) {
      wx.showModal({
        title: '提示',
        content: '对不起，没有可用优惠券',
        success (res) {
          if (res.confirm) {
          
          } else if (res.cancel) {
         
          }
        }
      })
     
    },
  contact: function (event) {
    wx.navigateTo({
      url: '../contact/contact'
    })
  },
  jingqu1:function(){
    wx.navigateTo({
      url: '../../packageAudio/pages/audio/audio',
    })
  },
 /* pintuan:function(event){
   wx.navigateTo({
     url: '../home/home',
   })
 
},*/

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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