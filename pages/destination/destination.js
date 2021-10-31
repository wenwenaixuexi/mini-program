//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    inputShowed: true,
    page: 0,
    listCard: [
      {
        name: "西安",
        ids: 0
      },
      {
        name: "济南",
        ids: 1
      },
      {
        name: "云南",
        ids: 2
      },
      {
        name: "大西北",
        ids: 3
      },
      {
        name: "西藏",
        ids: 4
      },
      {
        name: "新疆",
        ids: 5
      }
    ],

  },
  showInput() {
    this.setData({
      inputShowed: false
    })
  },
  hideInput() {
    this.setData({
      inputShowed: true,
      inputVal:[],
      inputValues:''
    })
  },
  
  //清除搜索框的输入内容
  clearInput(){
    let nums = this.data.inputValues.length;
    this.data.inputValues = this.data.inputValues.substring(0, nums - 1);
    this.setData({
      inputValues: this.data.inputValues
    })
    nums--;
    if (nums <=0) {
      let inputVal = this.data.inputVal = []
      this.setData({
        inputVal
      })
    }
  },
  // 点击切换标签
  clickChange(e) {
    var page = 0;
    this.setData({
      page: e.target.id
    })
    console.log(e.target.id);
    if (e.target.id == 0){
      wx.showModal({
        title: '提示',
        content: '是否选择西安地区旅行',
        success (res) {
          if (res.confirm) {
           wx.navigateTo({
             url: '../../packageAudio/pages/audio/audio',
           })
          } 
        }
      })
      
    } else if (e.target.id == 1){
      wx.showModal({
        title: '提示',
        content: '是否选择济南地区旅行',
        success (res) {
          if (res.confirm) {
           wx.navigateTo({
             url: '../audio2/audio2',
           })
          } 
        }
      })
      
    }else if(e.target.id == 2){
      wx.showToast({
        title: 'title',
      })
    }
  },
})