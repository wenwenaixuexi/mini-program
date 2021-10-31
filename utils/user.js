var httpUtils = require('./http.js')
var uriUtils = require('./uri.js')

//获取用户信息
function getUserInfo(cb) {
  uriUtils.removeToken();
  //调用登录接口
  wx.login({
    //获取code
    success: function(res) {
      if (res.code) {
        //发起网络请求,用于注册或获取用户信息
        dealWithUserCode(res.code, cb);
      } else {
        return typeof cb == "function" && cb(false)
      }
    },
    fail: function() {
      return typeof cb == "function" && cb(false)
    }
  })
}

function dealWithUserCode(code, cb) {
  httpUtils.postReq(uriUtils.GET_USERBY_CODE, {
    code: code
  }, function(res) {
    if (res) {
      //将用户token存到本地存储空间
      uriUtils.setToken(res.data, function(res_storage) {
        if (!res_storage) {
          return typeof cb == "function" && cb(false, '本地存储调用失败，请清理手机存储后重试');
        }
        if (res.code == 200) {
          return typeof cb == "function" && cb(uriUtils.CODE_SUCCESS)
        } else if (res.code == uriUtils.CODE_NEED_AUTH_USERINFO) {
          //用户信息不完善，需要再次获取用户信息，来完善用户资料
          unGetUserinfo(cb);
        } else {
          return typeof cb == "function" && cb(false, res.msg)
        }
      });
    }
  })
}

function unGetUserinfo(cb) {
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        wx.getUserInfo({
          lang: "zh_CN",
          success(res) {
            console.log(res)
            //更新用户信息
            updateUserInfo(res.userInfo, cb);
          },
          fail: function() {
            return typeof cb == "function" && cb(false)
          }
        })
      } else {
        //用户没有授权用户信息，需要用户授权一下
        return typeof cb == "function" && cb(uriUtils.CODE_NEED_AUTH_USERINFO)
      }
    },
    fail: function() {
      return typeof cb == "function" && cb(false)
    }
  })
}

function updateUserInfo(res, cb) {
  httpUtils.postReq(uriUtils.USERUPDATE, {
    nickName: res.nickName,
    gender: res.gender,
    avatarUrl: res.avatarUrl,
    country: res.country,
    province: res.province,
    city: res.city
  }, function(res) {
    if (res) {
      if (res.code == uriUtils.CODE_SUCCESS) {
        return typeof cb == "function" && cb(uriUtils.CODE_SUCCESS) //成功
      } else {
        return typeof cb == "function" && cb(false, res.msg)
      }
    }
  })
}

module.exports = {
  getUserInfo: getUserInfo,
  unGetUserinfo: unGetUserinfo,
}