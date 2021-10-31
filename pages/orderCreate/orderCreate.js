var uriUtil = require('../../utils/uri.js');
var mathUtil = require('../../utils/mathUtil.js');
var httpUtil = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: uriUtil.BASE_URL,
    baseImgUrl: uriUtil.BASE_URL_UPLOAD,
    cartList: [],
    totalPrice: 0,
    address:{
      id: '',
      name: '',
      phone: '',
      address: ''
    },
    couldClick: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.calculate();
  },

  /**
   * 选择收货地址
   */
  showAddressList: function(){
    wx.navigateTo({
      url: '../address/address',
    })
  },

  /**
   * 计算价格
   */
  calculate: function(){
    var that = this;
    let totalPrice = 0;
    let cartList = wx.getStorageSync('cart');
    cartList = cartList?cartList:[];
    let validateCartList = [];
    for(let i=0;i<cartList.length;i++){
      let item = cartList[i];
      if(item['checked']){
        item['totalPrice'] = mathUtil.accMul(item['count'],item['price']);
        totalPrice = mathUtil.accAdd(totalPrice, item['totalPrice']);
        validateCartList.push(item);
      }
    }
    that.setData({
      totalPrice: totalPrice,
      cartList: validateCartList
    })
  },

  /**
   * 确认下单
   */
  createOrder: function(){
    var that = this;
    if(!that.data.couldClick){
      wx.showToast({
        title: '请勿重复提交订单',
      });
      return;
    }

    if(!that.data.address.id){
      wx.showToast({
        title: '请选择收货地址',
      });
      return;
    }
    that.setData({
      couldClick: false
    });
    //订单信息
    let orderInfo = {
      totalPrice: that.data.totalPrice,
      addressId: that.data.address.id
    }
    //订单详情
    let orderDetails = [];
    let cartList = that.data.cartList;
    for(let i=0;i<cartList.length;i++){
      let item = cartList[i];
      orderDetails.push({
        goodsId: item['id'],
        num: item['count'],
        price: item['price']
      })
    }

    //请求网络
    httpUtil.postReq(uriUtil.ORDERSADD,{
      orderInfo: JSON.stringify(orderInfo),
      orderDetails: JSON.stringify(orderDetails)
    },function(res){
      if(res){
        //清空购物车
        wx.setStorageSync('cart', []);
        //销毁当前，跳转到订单支付页面
        wx.redirectTo({
          url: '../goodsPay/goodsPay?orderId='+res.data.id+'&totalPrice='+res.data.totalPrice,
        })
      }else{
        that.setData({
          couldClick: true
        })
      }
    })
  }
})