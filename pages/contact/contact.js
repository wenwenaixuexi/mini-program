// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: ["兵马俑", "大明湖景区", "五龙潭公园", "环城公园", "红叶谷生态文化旅游区", "水帘峡风景区", "灵岩寺", "九如山瀑布群风景区", "金象山乐园", "章丘区百脉泉公园", "济南国际园博园", "九顶塔中华民族欢乐园", "济南千佛山风景名胜区", "济南野生动物世界", "济南植物园", "朱家峪景区", "济南百里黄河风景区", "济南紫缘香草园", "青岛啤酒济南梦工厂","莲台山风景区"],
    tel: ["86920680", "86088945", "86924835", "86925504", "82818666", "82772888", "87468097", "82826666", "88345999", "83239900", "87206666", "88559999", "82662340", "83772666", "80950800", "83808158", "85696602", "83781177", "88756698", "87210099"],
    dizhi: ["陕西省西安市临潼区秦始皇陵以东", "明湖路271号", "济南历下区趵突泉北路筐市街18号(共青团路口)", "历下区南门大街2—1号", "历城区仲宫镇锦绣川水库南三公里", "历城区柳埠镇簸箕掌村", "长清区万德镇", "历城区西营镇葫芦峪村", "历城区锦绣川乡商家", "章丘区汇泉路31号", "长清区大学科技园内", "仲宫柳埠镇秦家庄", "历下区经十一路18号", "济南野生动物世界位于章丘区埠村街道南侧的埠西村", "济南章丘区埠村镇埠西村", "章丘区官庄镇朱家峪村", "济南洛口环城路166号", "章丘区圣井街道办事处", "高新区大正路3000号", "长清区张夏镇莲台山度假村"]
, tabs:[
  {
    id:0,
    value:"体验问题",
    isactive:true
  },
  {
    id:1,
    value:"商品、商家投诉",
    isactive:false
  },
],
chooseImages:[],
textVal:""
  },

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

  },
  UploadImgs:[],
  handletabsitemchange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isactive=true:v.isactive=false);
    this.setData({
      tabs
    })
    
  },

  handleChoose(){
    wx.chooseImage({
      success: (res) => {
        
        this.setData({
          chooseImages:[...this.data.chooseImages,...res.tempFilePaths]
        })
      },
    })
  },

  handleRemoveImg(e){
    
    const {index}=e.currentTarget.dataset;
    
    let {chooseImages}=this.data;
    
    chooseImages.splice(index,1)
    this.setData({
      chooseImages
    })
  },

  handleTextInpute(e){
    this.setData({
      textVal:e.detail.value,
    })
  },

  handleFormSubmit(){
    const {textVal,chooseImages}=this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true,
        duration: 1000,
      });
      return;
    }
    wx.showLoading({
      title: '正在上传中',
      mask:true
    })
    wx.navigateBack({
      delta:1
    })
    
  },

})