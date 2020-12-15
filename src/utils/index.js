export default {
  // 检查身份证号码
  // checkIdCard (id) {
  //   // 非法字符串
  //   if (typeof id !== 'string') return false
  //   // 小写转大写
  //   id = id.toUpperCase()
  //   const city = {
  //     11: '北京',
  //     12: '天津',
  //     13: '河北',
  //     14: '山西',
  //     15: '内蒙古',
  //     21: '辽宁',
  //     22: '吉林',
  //     23: '黑龙江 ',
  //     31: '上海',
  //     32: '江苏',
  //     33: '浙江',
  //     34: '安徽',
  //     35: '福建',
  //     36: '江西',
  //     37: '山东',
  //     41: '河南',
  //     42: '湖北 ',
  //     43: '湖南',
  //     44: '广东',
  //     45: '广西',
  //     46: '海南',
  //     50: '重庆',
  //     51: '四川',
  //     52: '贵州',
  //     53: '云南',
  //     54: '西藏 ',
  //     61: '陕西',
  //     62: '甘肃',
  //     63: '青海',
  //     64: '宁夏',
  //     65: '新疆',
  //     71: '台湾',
  //     81: '香港',
  //     82: '澳门',
  //     91: '国外'
  //   }
  //   let birthday = id.substr(6, 4) + '/' + Number(id.substr(10, 2)) + '/' + Number(id.substr(12, 2))
  //   let d = new Date(birthday)
  //   let newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
  //   let currentTime = new Date().getTime()
  //   let time = d.getTime()
  //   let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  //   let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  //   let sum = 0
  //   let i
  //   let residue

  //   // 非法身份证
  //   if (!/^\d{17}(\d|x)$/i.test(id)) return false
  //   // 非法地区
  //   if (city[id.substr(0, 2)] === undefined) return false
  //   // 非法生日
  //   if (time >= currentTime || birthday !== newBirthday) return false
  //   for (i = 0; i < 17; i++) {
  //     sum += id.substr(i, 1) * arrInt[i]
  //   }
  //   residue = arrCh[sum % 11]
  //   // 非法身份证哦
  //   if (residue !== id.substr(17, 1)) return false

  //   return city[id.substr(0, 2)] + ',' + birthday + ',' + (id.substr(16, 1) % 2 ? ' 男' : '女')
  // }
}
