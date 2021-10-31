let getQueryString = function (url, name) {
  console.log("url = " + url)
  console.log("name = " + name)
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    console.log("r = " + r)
    console.log("r[2] = " + r[2])
    return r[2]
  }
  return null;
}

/**
 * 对象的深层拷贝
 */
function deepCopy(obj) {
  if (typeof obj != 'object') {
    return obj;
  }
  var newobj = {};
  for (var attr in obj) {
    newobj[attr] = deepCopy(obj[attr]);
  }
  return newobj;
}

function getDateStrByTimeStamp(value) {
  var date = new Date(value);
  if (!date) {
    return '';
  }

  var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" +
    (date.getMonth() + 1);
  var hor = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  var min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  var sec = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
  return date.getFullYear() + '-' + month + '-' + day + " " + hor + ":" + min + ":" + sec;
}


function getDateStrWithoutYearByTimeStamp(value) {
  var date = new Date(value);
  if (!date) {
    return '';
  }

  var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" +
    (date.getMonth() + 1);
  var hor = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  var min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  var sec = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
  return month + '月' + day + "日" + hor + "时" + min + "分";
}

function getDateTimeInfo(value) {
  var date = new Date(value);
  if (!date) {
    return '';
  }

  var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" +
    (date.getMonth() + 1);
  var hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  var minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  var second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
  return {
    year: date.getFullYear(),
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    second: second
  };
}



module.exports = {
  getQueryString: getQueryString,
  deepCopy: deepCopy,
  getDateStrByTimeStamp: getDateStrByTimeStamp,
  getDateStrWithoutYearByTimeStamp: getDateStrWithoutYearByTimeStamp,
  getDateTimeInfo: getDateTimeInfo,
}