var CODE_NEED_AUTH_USERINFO = -3; //需要用户认证来获取用户信息
var CODE_ERROR = -1; //失败
var CODE_SUCCESS = 200; //成功
var CODE_SUCCESS_0 = 0;

var KEY_TOKEN = 'token'; //token的key
var USER_INFO = 'userInfo'; //用户信息

var IP = '110.42.216.7:8080';

var BASE_URL = 'http://' + IP + '/mycode/'; //BASEURL
var BASE_URL_UPLOAD = 'http://' + IP + '/mycode/'; //BASEURL


/**
 * 获取用户
 */
function getUserInfo() {
  return wx.getStorageSync(USER_INFO)
}

/**
 * 设置用户
 */
function setUserInfo(userInfo, cb) {
  wx.setStorage({
    key: USER_INFO,
    data: userInfo,
    success: function (res) {
      typeof cb == "function" && cb(true)
    },
    fail: function (res) {
      typeof cb == "function" && cb(false)
    }
  })
}


/**
 * 清除userInfo
 */
function removeUserInfo() {
  return wx.removeStorageSync(USER_INFO)
}


/**
 * 获取token
 */
function getToken() {
  return wx.getStorageSync(KEY_TOKEN)
}
/**
 * 清除token
 */
function removeToken() {
  return wx.removeStorageSync(KEY_TOKEN)
}
/**
 * 缓存token
 */
function setToken(token, cb) {
  wx.setStorage({
    key: KEY_TOKEN,
    data: token,
    success: function (res) {
      typeof cb == "function" && cb(true)
    },
    fail: function (res) {
      typeof cb == "function" && cb(false)
    }
  })
}
//相当于java中的public
module.exports = {
  setToken: setToken,
  removeToken: removeToken,
  removeUserInfo: removeUserInfo,
  getToken: getToken,
  setUserInfo: setUserInfo,
  getUserInfo: getUserInfo,
  CODE_SUCCESS_0: CODE_SUCCESS_0,
  CODE_SUCCESS: CODE_SUCCESS,
  CODE_ERROR: CODE_ERROR,
  CODE_NEED_AUTH_USERINFO: CODE_NEED_AUTH_USERINFO,

  BASE_URL: BASE_URL,
  BASE_URL_UPLOAD: BASE_URL_UPLOAD,

  GET_USERBY_CODE: 'user/getUserByCode',
  USERUPDATE: "user/update",
  USERLIST: "user/getList",
  ADDRESSLIST: "address/getList",
  ADDRESSADD: "address/add",
  ADDRESSUPDATE: "address/update",
  ADDRESSUPDATESTATE: "address/updateState",
  ADVERTISEMENTLIST: "advertisement/getList",
  GOODSLIST: "goods/getList",
  GOODSTYPELIST: "goodsType/getList",
  ORDERSLIST: "orders/getList",
  ORDERSADD: "orders/add",
  ORDERSUPDATESTATE: "orders/updateState",
  UPLOAD_FILE: "upload/uploadImg",
}