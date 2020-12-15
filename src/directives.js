export default {
  // input框只能输入正整数
  // 这个指令, 对input输入中文没有限制效果(macOS 10.14, Chrome 72.0.3626.121)
  // 还需要配合input(type="number")原生属性来限制
  posInt: {
    // bind (el, binding, vnode) {
    //   // 因为用的是element 的el-input ，组件input外层包着一层div所以要使用const oInput = el.getElementsByTagName('input')[0]获取
    //   const oInput = el.getElementsByTagName('input')[0]
    //   const val = binding.value ? binding.value.toString() : ''
    //   const len = binding.arg
    //   console.log(val)
    //   // input对其监听keypress事件 当输入的不是[0-9]时, 调用preventDefault()阻止事件
    //   oInput.addEventListener('keypress', e => {
    //     e = e || window.event
    //     const charCode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
    //     const re = /^\d$/
    //     if (!re.test(String.fromCharCode(charCode)) && charCode > 9 && !e.ctrlKey) {
    //       e.preventDefault()
    //     }
    //   })
    //   // oInput.addEventListener('key')
    // },

    // 🔥🔥🔥 2019-04-02更新
    // 但是(type="number")用鼠标滑动会更新值, 导致值可以变为负数
    // 所以还是用(type="text来实现好点")
    update (el, binding, vnode) {
      const val = binding.value ? binding.value.toString() : ''
      const len = parseInt(binding.arg) || 50
      if (val === '') return
      const re = new RegExp(`^[1-9][0-9]{0,${len - 1}}$`)
      if (!re.test(val)) {
        vnode.data.model.callback(binding.oldValue)
      }
    }
  },
  posFloat: {
    update (el, binding, vnode) {
      const val = binding.value ? binding.value.toString() : ''
      const len = parseInt(binding.arg) || 50
      if (val === '') return
      const re = new RegExp(`^[1-9][0-9]{0,${len - 1}}\\.?[0-9]{0,2}$`)
      if (!re.test(val)) {
        vnode.data.model.callback(binding.oldValue)
      }
    }
  },
  has: {
    inserted: function (el, binding) {
      function has (value) {
        let isExist = false
        // 从浏览器缓存中获取权限数组
        var buttonpermsStr = sessionStorage.getItem('buttonList')
        if (buttonpermsStr === undefined || buttonpermsStr == null) {
          return false
        } else {
          JSON.parse(buttonpermsStr).forEach(element => {
              // 匹配缓存中的数据中有没有匹配的值
            if (element.pageUrl === value) {
              // 若在按钮中定义的权限字段能在后端返回的权限数组中能找到，则该按钮可显示
              isExist = true
            }
          })
        }
        return isExist
      }
      console.log('element:', el)
      // 获取按钮权限
      if (!has(binding.value)) {
       // 移除不匹配的按钮
        el.style.display = 'none'
      }
    }
  }
}
