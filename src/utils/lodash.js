// 按需加载, 减少打包后体积大小
import clone from 'lodash/clone'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import omit from 'lodash/omit'
import at from 'lodash/at'
import kebabCase from 'lodash/kebabCase'

export default {
  clone,
  // 深度克隆
  cloneDeep,
  debounce,
  throttle,
  find,
  // 判断是否为空
  isEmpty,
  // 首字母大写
  upperFirst,
  // 将字符串驼峰命名
  camelCase,
  // 删掉对象中的某个字段
  omit,
  // 对象取值
  at,
  // 将字符串转化为短横线命名
  kebabCase
}
