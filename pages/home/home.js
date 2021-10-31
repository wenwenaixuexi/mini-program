// pages/home/home.js
var landscapeData=require("../../utils/data.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
 
    landscapeShowList:[],
    countdown: '', 
    endDate2: '2022-5-18 11:41:00',
    d:'',
    h:'',
    m:'',
    s:''
  },
  onLoad: function (options) {
    var that = this;
    var landscapeList = landscapeData.getlandscapeList();
    var landscapeShowList=[];
    var loveList=wx.getStorageSync("loveList")
    for(let i=0;i<landscapeList.length;i++){
      landscapeShowList.push(
        {
          detail:landscapeList[i],
          isLove:false,
          ispintuanOrders:false
        }
      )
    }
  /*  for(let i=0;i<loveList.length;i++){
      var index=loveList[i];
      landscapeShowList[index].isLove=true;
    }*/
    this.setData({
      landscapeShowList: landscapeShowList
    })
    that.countTime()
  },
  countTime() {
    var that = this;
    var date = new Date();
    var now = date.getTime();
    var endDate = new Date(that.data.endDate2);//设置截止时间
    var end = endDate.getTime();
    var leftTime = end - now; //时间差                              
    var d, h, m, s, ms;
    if (leftTime >= 0) {
      d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      m = Math.floor(leftTime / 1000 / 60 % 60);
      s = Math.floor(leftTime / 1000 % 60);
      ms = Math.floor(leftTime % 1000);
      ms = ms < 100 ? "0" + ms : ms
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h = h < 10 ? "0" + h : h
      that.setData({
        countdown: d + "：" + h + "：" + m + "：" + s + ":" + ms,
        d:d,
        m:m,
        s:s,
        h:h

      })
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(that.countTime, 100);
    } else {
      console.log('已截止')
      that.setData({
        countdown: '00:00:00'
      })
    }
 
  },
  

  topintuanOrders:function(event){
    var flag;
    var index = event.currentTarget.dataset.id;
    var ispintuanOrders=this.data.landscapeShowList[index].ispintuanOrders;
  
    if(!ispintuanOrders){
      var oper = "landscapeShowList[" + index + "].ispintuanOrders";
      this.setData({
        [oper]: true
      })
     //存缓存
      var pintuanOrdersList=wx.getStorageSync("pintuanOrdersList")||[];

      pintuanOrdersList.push({
        index:index,
        count:1,
        flag:0
      });
      wx.setStorageSync("pintuanOrdersList", pintuanOrdersList);
      wx.navigateTo({
        url: '../pintuanPay/pintuanPay',
      })
    }
  },
  topsingleOrders:function(event){
    wx.showModal({
      title: '提示',
      content: '单独购买不享受优惠哦！',
      success : res => {
        if (res.confirm) {
          console.log(event)
          var flag;
          var index = event.currentTarget.dataset.id;
          var ispintuanOrders=this.data.landscapeShowList[index].ispintuanOrders;
        
          if(!ispintuanOrders){
            var oper = "landscapeShowList[" + index + "].ispintuanOrders";
            this.setData({
              [oper]: true
            })
           //存缓存
            var pintuanOrdersList=wx.getStorageSync("pintuanOrdersList")||[];
      
            pintuanOrdersList.push({
              index:index,
              count:1,
              flag:1
            });
            wx.setStorageSync("pintuanOrdersList", pintuanOrdersList);
            wx.navigateTo({
              url: '../singlePay/singlePay',
            })
          }
        } else if (res.cancel) {
          console.log('取消')
        }
      }
  })
  },

})