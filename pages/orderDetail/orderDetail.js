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
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let id=options['id'];
    that.getOrderList(id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceH: res.windowHeight
        })
      },
    })
  },

  /**
     * 查询订单
     */
  getOrderList: function (id) {
    var that = this;
    that.setData({
      orderList: []
    });
    let stateParam = {
      id: id
    };
    httpUtil.postReq(uriUtil.ORDERSLIST, stateParam, function (res) {
      if (res) {
        let dataList = res.data;
        for (let i = 0; i < dataList.length; i++) {
          let bean = dataList[i];
          //时间处理
          bean['createTime'] = publicUtil.getDateStrByTimeStamp(bean['createTime']);
          //状态处理
          let str = '';
          switch (bean.state) {
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

})