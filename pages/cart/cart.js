var uriUtil = require('../../utils/uri.js');
var mathUtil = require('../../utils/mathUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: uriUtil.BASE_URL,
    baseImgUrl: uriUtil.BASE_URL_UPLOAD,
    cartList: [],
    isSelectAll: false,
    totalPrice: 0.00
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    let cartList = wx.getStorageSync('cart');
    cartList = cartList ? cartList : [];
    that.data.cartList = cartList;
    
    that.common();
  },

  /**
   * 公共方法
   */
  common: function(){
    var that = this;
    let isSelectAll = true;
    let totalPrice = 0.00;
    let cartList = that.data.cartList;
    for(let i=0;i<cartList.length;i++){
      let item = cartList[i];
      if(item['checked']){
        totalPrice = mathUtil.accAdd(mathUtil.accMul(item['price'],item['count']),totalPrice);
      }else{
        isSelectAll=false;
      }
    }
    that.setData({
      isSelectAll:isSelectAll,
      totalPrice:totalPrice,
      cartList: cartList
    })
  },

  /**
   * 选择框的点击事件
   */
  selectChange: function(e){
    let that = this;
    let pos = e.currentTarget.dataset.index;
    let cartList = that.data.cartList;
    let item = cartList[pos];
    item['checked'] = !item['checked'];
    wx.setStorageSync('cart',cartList);
    that.common();
  },

  /**
   * 减
   */
  minus: function(e){
    let that = this;
    let pos = e.currentTarget.dataset.index;
    let cartList = that.data.cartList;
    let item = cartList[pos];
    if(item['count']>1){
      item['count']--;
    }
    wx.setStorageSync('cart', cartList);
    that.common();
  },

  /**
   * 加
   */
  add: function (e) {
    let that = this;
    let pos = e.currentTarget.dataset.index;
    let cartList = that.data.cartList;
    let item = cartList[pos];
    item['count']++;
    wx.setStorageSync('cart', cartList);
    that.common();
  },

/**
 * 全选或不选
 */
  selectAll: function(){
    let that = this;
    let cartList = that.data.cartList;
    let isSelectAll = that.data.isSelectAll;

    for(let i=0;i<cartList.length;i++){
      let item = cartList[i];
      item['checked'] = !isSelectAll;
    }
    wx.setStorageSync('cart', cartList);
    that.common();
  },

  /**
   * 结算
   */
  showCreateOrderPage: function(){
    let that = this;
    let totalPrice = that.data.totalPrice;
    if(totalPrice<=0){
      wx.showModal({
        title: '提示',
        content: '请选择要购买的纪念品',
        showCancel: false
      });
      return;
    }
    wx.navigateTo({
      url: '../../pages/orderCreate/orderCreate',
    })
  }

})