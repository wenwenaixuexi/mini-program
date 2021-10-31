var uriUtils = require('./uri.js')
var header = {
  'Accept': 'application/json',
  'content-type': 'application/x-www-form-urlencoded',
  'from': 'micro',
  'token': null,
}

function getReq(url, cb, showNoCommonModal) {
  wx.showLoading({
    title: '加载中...',
  })
  header.token = uriUtils.getToken();
  wx.request({
    url: uriUtils.BASE_URL + url,
    method: 'get',
    header: header,
    success: function (res) {
      if (res.data.code != uriUtils.CODE_SUCCESS &&
        res.data.code != uriUtils.CODE_NEED_AUTH_USERINFO) {
        if (!showNoCommonModal) {
          showErrModal(res.data.msg, '提示');
        }
        return typeof cb == "function" && cb(false, res.data.msg)
      }
      console.log(res)
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      if (!showNoCommonModal) {
        showErrModal();
      }
      return typeof cb == "function" && cb(false)
    },
    complete: function () {
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

function postReq(url, data, cb, showNoCommonModal, showLoading = true) {
  if (showLoading) {
    wx.showLoading({
      title: '加载中...',
    })
  }
  data['page'] = 1;
  data['limit'] = 10000;
  header.token = uriUtils.getToken();
  wx.request({
    url: uriUtils.BASE_URL + url,
    header: header,
    data: data,
    method: 'post',
    success: function (res) {
      if (res.data.code != uriUtils.CODE_SUCCESS &&
        res.data.code != uriUtils.CODE_SUCCESS_0 &&
        res.data.code != uriUtils.CODE_NEED_AUTH_USERINFO) {
        if (!showNoCommonModal) {
          showErrModal(res.data.msg, '提示');
        }
        return typeof cb == "function" && cb(false, res.data.msg)
      }
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      if (!showNoCommonModal) {
        showErrModal();
      }
      return typeof cb == "function" && cb(false)
    },
    complete: function () {
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })

}

function showErrModal(content, title) {
  wx.hideLoading();
  wx.stopPullDownRefresh();
  wx.showModal({
    title: title ? title : '网络错误',
    content: content ? content : '网络出错，请重试',
    showCancel: false
  })
}

module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
}