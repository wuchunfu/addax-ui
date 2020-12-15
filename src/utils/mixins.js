export default {
  $exportDetail: {
    methods: {
      $exportDetail (url, query) {
        let str = '?'
        // 不是点击全选就是数组 做下判断
        if (query.length) {
          if (!query.length) {
            this.$message.warning('请先勾选要导出的数据')
            return
          }
          query = JSON.stringify(query).replace(/\[|]|,/g, '')
          for (let i = 0, l = query.length; i < l; i++) {
            str += `ids=${query[i]}&`
          }
          window.open(this.$config.apiBaseUrl + url + str.substr(0, str.length - 1))
          return
        }
        // 点击全选传的是table.query
        for (let item in query) {
          // 处理时间
          if (query[item] && item === 'startDate') {
            query['startDate'] = query['startDate'].substr(0, 10).replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1/$2/$3')
            query['endDate'] = query['endDate'].substr(0, 10).replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1/$2/$3')
          }
          // 处理数据
          if (query[item] && item !== 'pageNo' && item !== 'pageSize') {
            str += `${item}=${query[item]}&`
          }
        }
        window.open(this.$config.apiBaseUrl + url + str.substr(0, str.length - 1))
      }
    }
  },
  $exportDetails: {
    methods: {
      $exportDetails (url, query) {
        let str = '?'
        // 不是点击全选就是数组 做下判断
        if (query.length) {
          if (!query.length) {
            this.$message.warning('请先勾选要导出的数据')
            return
          }
          query = JSON.stringify(query).replace(/\[|]|,/g, '')
          for (let i = 0, l = query.length; i < l; i++) {
            str += `ids=${query[i]}&`
          }
          window.open(this.$config.apiBaseUrl + url + str.substr(0, str.length - 1))
          return
        }
        // 点击全选传的是table.query
        for (let item in query) {
          // 处理时间
          if (query[item] && item === 'startDate') {
            query['startDate'] = query['startDate'].substr(0, 10).replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1/$2/$3')
            query['endDate'] = query['endDate'].substr(0, 10).replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1/$2/$3')
          }
          // 处理数据
          if (query[item]) {
            str += `${item}=${query[item]}&`
          }
        }
        window.open(this.$config.apiBaseUrl + url + str.substr(0, str.length - 1))
      }
    }
  },
  $spliceHTML: {
    methods: {
      $spliceHTML (html) {
        html = html.replace('<html><head><META http-equiv="Content-Type" content="text/html; charset=UTF-8">', '')
        html = html.replace('</head>', '')
        html = html.replace('</body></html>', '')
        html = html.replace(/<h2>(.*)<\/h2>/, '')
        return html
      }
    }
  }
}
