var uriUtils = require('../uri.js');
var userUtils = require('../user.js');

/**
 *用户一进入到这个页面就走这个登录的入口 
 */
function userLogin(that) {
  userUtils.getUserInfo(function (res, msg) {
    if (!res) {
      //弹出提示用户再次刷新数据的窗体
      that.setData({
        loginDialog: {
          isShow: true,
          needAuthUserinfo: true,
          loginMsg: msg ? msg : '请检查您的网络是否畅通，下拉刷新试试'
        }
      })
      return;
    }
    if (res == uriUtils.CODE_NEED_AUTH_USERINFO) {
      that.setData({
        getUserinfoDialog: {
          needAuthUserinfo: true,
          isShow: true,
        }
      })
    } else if (res == uriUtils.CODE_SUCCESS) {

    }
  });
}

/**
 *登陆失败，点击再试一次触发这个方法 
 */
function loginTryAgain(that) {
  //隐藏再试一次对话窗
  that.setData({
    loginDialog: {
      isShow: false,
      needAuthUserinfo: true,
      loginMsg: ''
    }
  })
  //获取用户信息
  userLogin(that);
}
/**
 * 用户授权是否允许获取基本信息的回调,
 * 不管是授权还是不授权，
 * 都要隐藏窗口，然后默默更新用户信息
 */
function getUserinfoBtnClick(that, e, cb) {
  let userInfo = e.detail.userInfo;
  that.setData({
    getUserinfoDialog: {
      isShow: false,
      needAuthUserinfo: true
    }
  })
  console.log(userInfo)
  if (userInfo) {
    //上传用户基本信息
    userUtils.unGetUserinfo(function (res) {
      //因为不是强制的，这里不做任何操作
      if (res == uriUtils.CODE_SUCCESS) {
        that.setData({
          getUserinfoDialog: {
            isShow: false,
            needAuthUserinfo: false
          }
        })
        return typeof cb == "function" && cb(true)
      } else {
        that.setData({
          getUserinfoDialog: {
            isShow: false,
            needAuthUserinfo: true
          }
        })
        return typeof cb == "function" && cb(false)
      }
    })
  } else {
    that.setData({
      getUserinfoDialog: {
        isShow: false,
        needAuthUserinfo: true
      }
    })
    // wx.showModal({
    //   title: '温馨提示',
    //   content: '我们将获取您的昵称和头像信息，为了不影响您的使用，请您选择允许哦',
    // })
    return typeof cb == "function" && cb(false)
  }
}
module.exports = {
  userLogin: userLogin,
  loginTryAgain: loginTryAgain,
  getUserinfoBtnClick: getUserinfoBtnClick,
}