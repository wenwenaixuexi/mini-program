var uriUtil = require("../../utils/uri.js");
var httpUtil = require("../../utils/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: uriUtil.BASE_URL,
    baseImgUrl: uriUtil.BASE_URL_UPLOAD,
    orderId: '',
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      orderId: options['orderId'],
      totalPrice: options['totalPrice']
    })
  },

  /**
   * 提交订单
   */
  payOrder: function(){
    var that = this;
    let orderId = that.data.orderId;
    httpUtil.postReq(uriUtil.ORDERSUPDATESTATE,{
      id: orderId,
      state: 2
    },function(res){
      if(res){
        wx.redirectTo({
          url: '../myOrders/myOrders',
        })
      }
    })
  }
})