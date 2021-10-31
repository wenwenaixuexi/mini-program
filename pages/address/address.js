var uriUtil = require('../../utils/uri.js');
var httpUtil = require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: uriUtil.BASE_URL,
    baseImgUrl: uriUtil.BASE_URL_UPLOAD,
    addressList: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getDataList();
  },

  getDataList: function(){
    var that = this;
    httpUtil.postReq(uriUtil.ADDRESSLIST,{
      state: 1
    },function(res){
      if(res){
        that.setData({
          addressList: res.data
        })
      }
    })
  },

  /**
   * 点击项目返回选择后的收货地址对象
   */
  onItemClick: function(e){
    let item = this.data.addressList[e.currentTarget.dataset.index];
    let pages = getCurrentPages();  //获取当前页面js里面的pages里的所有信息
    let prevPage = pages[pages.length-2]; //prevPage是获取上一个页面的js里面的pages的所有信息。-2是上一个页面，-3上上个页面
    prevPage.setData({
      address: item
    });
    //跳转回上一页
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 长按项目 ，删除当前所选的地址
   */
  onItemLongClick: function(e){
    var that = this;
    let item = this.data.addressList[e.currentTarget.dataset.index];
    wx.showModal({
      title: '删除确认',
      content: '您确定要删除该地址吗？',
      confirmText: '删除',
      success: function(res){
        if(res.confirm){
          httpUtil.postReq(uriUtil.ADDRESSUPDATESTATE,{
            state: 2,
            id: item['id']
          },function(res){
            if(res){
              that.getDataList();
            }
          })
        }
      }
    })
  },

  /**
   * 修改
   */
  editItem: function(e){
    let item = this.data.addressList[e.currentTarget.dataset.index];
    //跳转到修改页面
    wx.navigateTo({
      url: '../addressOperate/addressOperate?id='+item['id'],
    })
  },

/**
   * 新增
   */
  showAddressAddView: function () {
    //跳转到修改页面show
    wx.navigateTo({
      url: '../addressOperate/addressOperate?id=',
    })
  }

})