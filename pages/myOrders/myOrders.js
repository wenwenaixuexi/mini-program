var uriUtil = require('../../utils/uri.js');
var httpUtil = require('../../utils/http.js');
var publicUtil = require('../../utils/public.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: uriUtil.BASE_URL,
    baseImgUrl: uriUtil.BASE_URL_UPLOAD,
    currtab: 0,
    swipertab: [
      {
        name: '全部',
        index: 0
      },
      {
        name: '待支付',
        index: 1
      },
      {
        name: '待发货',
        index: 2
      },
      {
        name: '待收货',
        index: 3
      },
      {
        name: '已完成',
        index: 4
      },
    ],
    orderList: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(){
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          deviceH: res.windowHeight
        })
      },
    })
  },

  /**
   * 选项卡点击切换
   */
  tabSwitch: function(e){
    var that = this;
    if (that.data.currtab == e.target.dataset.current){
      return false;
    }
    that.setData({
      currtab : e.target.dataset.current
    });
    that.getOrderList();
  },

  tabChange: function(e){
    this.setData({
      currtab: e.detail.current
    })
    this.getOrderList();
  },

  /**
   * 查询订单
   */
  getOrderList: function(){
    var that = this;
    that.setData({
      orderList: []
    });
    let stateParam = that.data.currtab == 0 ? {} :{
      state: that.data.currtab
    };
    httpUtil.postReq(uriUtil.ORDERSLIST,stateParam,function(res){
      if(res){
        let dataList = res.data;
        for(let i = 0;i<dataList.length;i++){
          let bean = dataList[i];
          //时间处理publicUtil.getDateStrByTimeStamp(bean['createTime'])将时间转换为字符串格式
          bean['createTime'] = publicUtil.getDateStrByTimeStamp(bean['createTime']);
          //状态处理
          let str = '';
          switch (bean.state){
            case 1:
              str = '待支付';
              break;
            case 2:
              str = '待发货';
              break;
            case 3:
              str = '待收货';
              break;
            case 4:
              str = '已完成';
              break;
          }
          bean['stateStr'] = str;
        }
        that.setData({
          orderList: dataList
        })
      }
    })
  },

  /**
   * 商品点击事件
   */
  onItemClick: function(e){
    var that = this;
    let currentIndex = e.currentTarget.dataset.index;
    let item = that.data.orderList[currentIndex];
    let orderId = item.id;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+orderId,
    })
  },

  /**
   * 支付
   */
  payOrder: function(e){
    var that = this;
    let currentIndex = e.currentTarget.dataset.index;
    let item = that.data.orderList[currentIndex];
    let orderId = item.id;
    httpUtil.postReq(uriUtil.ORDERSUPDATESTATE,{
      id: orderId,
      state: 2
    },function(res){
      if(res){
        if(that.data.currtab == 1){
          //删除当前对象
          that.data.orderList.splice(currentIndex,1);
        }else{
          item['state'] =2;
          item['stateStr'] = '已支付';
        }
      }
      that.setData({
        orderList: that.data.orderList
      })
    })
  },

  /**
   * 收货
   */
  endOrder: function (e) {
    var that = this;
    let currentIndex = e.currentTarget.dataset.index;
    let item = that.data.orderList[currentIndex];
    let orderId = item.id;
    httpUtil.postReq(uriUtil.ORDERSUPDATESTATE, {
      id: orderId,
      state: 4
    }, function (res) {
      if (res) {
        if (that.data.currtab == 3) {
          //删除当前对象
          that.data.orderList.splice(currentIndex, 1);
        } else {
          item['state'] = 4;
          item['stateStr'] = '已完成';
        }
      }
      that.setData({
        orderList: that.data.orderList
      })
    })
  }
})
