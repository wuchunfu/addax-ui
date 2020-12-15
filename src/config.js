export default {
  apiBaseUrl: process.env.VUE_APP_URL,
  uploadUrl () {
    return this.apiBaseUrl + '/oss/upload.do'
  },
  formLabelPosition: 'left',
  textAreaRows: 10,
  datePickerFormat: 'yyyy-MM-dd',
  datePickerValueFormat: 'yyyy-MM-dd 00:00:00',
  regexp: {
    //password
    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
    // 汉字
    chinese: /^[\u4e00-\u9fa5]+$/,
    // 非汉字
    notChinese: /[\u4e00-\u9fa5]+/,
    // 手机号码
    phone: /^((1[3,5,8][0-9])|(14[5,7])|166|(17[0,3,5-8])|(19[7-9]))\d{8}$/,
    //合法的IP地址
    isValidIp: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
  },
  fileAccept: {
    excel: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
  }
}
