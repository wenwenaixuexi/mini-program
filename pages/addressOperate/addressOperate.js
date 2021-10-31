var uriUtil = require('../../utils/uri.js');
var httpUtil = require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: uriUtil.BASE_URL,
    baseImgUrl: uriUtil.BASE_URL_UPLOAD,
    formData:{
      id: '',
      name: '',
      phone: '',
      address: ''
    },
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options['id'];
    var that = this;
    that.data.id = id;
    if(that.data.id){
      that.getDataList();
      setMyData('id',id);
    }
  },

  /**
   * 根据id查询当前地址详情
   */
  getDataList: function(){
    var that = this;
    httpUtil.postReq(uriUtil.ADDRESSLIST,{
      state: 1,
      id: that.data.id
    },function(res){
      if(res){
        let bean = res.data[0];
        that.setData({
          formData:{
            id: bean['id'],
            name: bean['name'],
            phone: bean['phone'],
            address: bean['address'],
          }
        })
      }
    })
  },

  onInput: function(e){
    let typename = e.currentTarget.dataset.typename;
    let value = e.detail.value;
    this.setMyData(typename,value);
  },

  setMyData: function(key,value){
    let formData = this.data.formData;
    formData[key] = value;
    this.setData({
      formData: formData
    })
  },

  /**
   * 提交
   */
  operate: function(){
    var that = this;
    let formData = that.data.formData;
    let url = that.data.id ? uriUtil.ADDRESSUPDATE : uriUtil.ADDRESSADD;
    httpUtil.postReq(url,formData,function(res){
      if(res){
        wx.showToast({
          title: '保存成功',
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }

})