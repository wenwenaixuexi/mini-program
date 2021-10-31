var uriUtil = require('../../utils/uri.js');
var httpUtil = require('../../utils/http.js');
var loginUtil = require('../../utils/js/loginUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: uriUtil.BASE_URL,
    baseImgUrl: uriUtil.BASE_URL_UPLOAD,
    dataList:[],
    searchName: '',
    //系统数据
    systemInfo:{
      windowWidth:720,
      windowHeight:1080
    },
    //轮播图数据
    swiperInfo:{
      swiperData: [],
      indicatorDots: true,
      indicatorColor: "#FFF",
      indicatorActiveColor: "#0F0",
      autoplay: true,
      interval: 3000,
      duration: 1500,
      circular: true,
      width: "900",
      height: "500"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    loginUtil.userLogin(that);
    that.onPullDownRefresh();
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    that.getSystemInfo();
    that.getBookList();
  },

  /**
   * 获取系统基础信息
   */
  getSystemInfo: function(){
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          systemInfo:{
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight
          }
        });
        //获取到数据后，就去加载其它数据
        that.getAdvertisementList();
      },
      fail:function(){
        wx.showToast({
          title: '提示',
          content:'未能获取到设备信息，请退出后重新进入'
        })
      }
    })
  },

  onNameInput: function(e){
    let value = e.detail.value;
    this.setData({
      searchName: value ? value : ''
    })
  },

  searchIt: function(){
    let that = this;
    that.getBookList();
  },

  /**
   * 获取轮播图列表
   */
  getAdvertisementList:function(){
    var that = this;
    httpUtil.postReq(uriUtil.ADVERTISEMENTLIST,{state:1},function(res){
      if(res){
        //设置轮播图数据
        var tempSwiperInfo = that.data.swiperInfo;
        tempSwiperInfo.width = that.data.systemInfo.windowWidth;
        tempSwiperInfo.height = that.data.systemInfo.windowWidth * 330 / 720;
        tempSwiperInfo.swiperData = res.data;
        that.setData({
          swiperInfo: tempSwiperInfo
        })
      }
    },false,true);
  },
  onScrollPageClick: function(e){
    let goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../../pages/goodsDetail/goodsDetail?id='+goodsid,
    })
  },

  /**
   * 获取精品列表
   */
  getBookList: function(){
    var that = this;
    httpUtil.postReq(uriUtil.GOODSLIST,{
      state:1,
     // ishot:1,
      keyword: that.data.searchName
    },function(res){
      if(res){
        that.setData({
          dataList: res.data
        });
      }      
    },false,true);
  },

  /**
   * 点击精品列表中，转向纪念品的详细页面
   */
  onGoodClick: function(e){
    let that = this;
    let pos = e.currentTarget.dataset.index;
    let item = that.data.dataList[pos];
    wx.navigateTo({
      url: '../../pages/goodsDetail/goodsDetail?id=' + item.id,
    })
  }
})