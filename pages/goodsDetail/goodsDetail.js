var uriUtil = require('../../utils/uri.js');
var httpUtil = require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: uriUtil.BASE_URL,
    baseImgUrl: uriUtil.BASE_URL_UPLOAD,
    good: [],
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let id = options.id;
    that.setData({
      id: id
    });
    that.onPullDownRefresh();
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    that.getGoodsDetail();
  },

  /**
   * 获取当前
   */
  getGoodsDetail: function(){
    var that = this;
    httpUtil.postReq(uriUtil.GOODSLIST,{
      id: that.data.id
    },function(res){
      if(res){
        let good = res.data[0];
        that.setData({
          good: good
        })
        wx.setNavigationBarTitle({
          title: good.name,
        })
      }
    },false,true);
  },

  /**
   * 加入购物车
   */
  addCart: function(){
    let that = this;
    let good = that.data.good;
    let cartList = wx.getStorageSync('cart');
    cartList = cartList?cartList:[];
    //遍历购物车，看是否已经有该商品
    let originCartItem;
    for(let i=0;i<cartList.length;i++){
      let cartItem = cartList[i];
      if(cartItem['id']==good['id']){
        originCartItem = cartItem;
        break;
      }
    }
    if(originCartItem){
      //原来有
      originCartItem['count']++;
    }else{
      //原来没有
      originCartItem = good;
      originCartItem['count'] = 1;
      cartList.push(originCartItem);
    }
    wx.setStorageSync('cart', cartList);
    wx.showToast({
      title: '添加购物车成功',
    })
  }
})