function randomNum () {
  let arr = [1, 2, 3] // 保证六位随机码包含数字+大写字母+小写字母
  let code = ''
  function getRandom (min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }
  function randomsort (a, b) {
    return Math.random() > 0.5 ? -1 : 1
    // 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
  }
  for (let i = 0; i < 3; i++) {
    arr.push(getRandom(1, 3)) // 补成六位
  }
  arr.sort(randomsort) // 打乱数组
  for (let i = 0; i < 6; i++) {
    let type = arr[i]
    switch (type) {
      case 1:
        code += String.fromCharCode(getRandom(48, 57)) // 数字
        break
      case 2:
        code += String.fromCharCode(getRandom(65, 90)) // 大写字母
        break
      case 3:
        code += String.fromCharCode(getRandom(97, 122)) // 小写字母
        break
    }
  }
  return code
}

// async function pwd (vm, api, form) {
//   try {
//     let _vm = vm
//     let rsaPublic = await vm.$api('/security/getRsaPublicKey', {})
//     let res
//     let code = randomNum()
//     let jse = new _vm.$jsEncrypt()
//     jse.setPublicKey(rsaPublic.publicKey) // 加入rsa public key
//     if (api === 'authLoginManage') {
//       let { pwd, verifyCode, phone } = form
//       pwd = pwd + code
//       let pwdMd5 = _vm.$md5(pwd)
//       let rsaPwd = jse.encrypt(pwd)
//       let rsaPwdMd5 = jse.encrypt(pwdMd5)
//       res = await _vm.$api('/auth/loginManage', {
//         phone,
//         pwd: rsaPwd,
//         md5: rsaPwdMd5,
//         random: code,
//         verifyCode,
//         keyNo: rsaPublic.keyNo
//       })
//     } else if (api === 'adminUpdatePwd') {
//       let { oldPwd, newPwd } = form
//       oldPwd = oldPwd + code
//       newPwd = newPwd + code
//       let oldPwdMd5 = _vm.$md5(oldPwd)
//       let oldRsaPwd = jse.encrypt(oldPwd)
//       let oldRsaPwdMd5 = jse.encrypt(oldPwdMd5)
//       let newPwdMd5 = _vm.$md5(newPwd)
//       let newRsaPwd = jse.encrypt(newPwd)
//       let newRsaPwdMd5 = jse.encrypt(newPwdMd5)
//       res = await _vm.$api('/admin/updatePwd', {
//         oldPwd: oldRsaPwd,
//         newPwd: newRsaPwd,
//         oldPwdMd5: oldRsaPwdMd5,
//         random: code,
//         newPwdMd5: newRsaPwdMd5,
//         keyNo: rsaPublic.keyNo
//       })
//     } else if (api === 'adminResetPwd') {
//       let { adminId, pwd } = form
//       pwd = pwd + code
//       let pwdMd5 = _vm.$md5(pwd)
//       let rsaPwd = jse.encrypt(pwd)
//       let rsaPwdMd5 = jse.encrypt(pwdMd5)
//       res = await _vm.$api('/admin/resetPwd', {
//         adminId,
//         pwd: rsaPwd,
//         md5: rsaPwdMd5,
//         random: code,
//         keyNo: rsaPublic.keyNo
//       })
//     }
//     return res
//   } catch (error) {
//     console.log(error)
//     return Promise.reject(error)
//   }
// }

export default {
  pwd
}
