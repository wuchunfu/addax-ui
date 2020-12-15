// 枚举合集
export default {
  mysqlwriteMode: {
    list: [
      {label: 'insert', value: 'insert'},
      {label: 'replace', value: 'replace'},
      {label: 'update', value: 'update'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'insert':
          return 'insert'
        case 'replace':
          return 'replace'
        case 'update':
          return 'update'
        default:
          return val
      }
    }
  },
  hdfswriteMode: {
    list: [
      {label: 'overwrite', value: 'overwrite'},
      {label: 'append', value: 'append'},
      {label: 'nonConflict', value: 'nonConflict'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'overwrite':
          return 'overwrite'
        case 'append':
          return 'append'
        case 'nonConflict':
          return 'nonConflict'
        default:
          return val
      }
    }
  },
  dbfwriteMode: {
    list: [
      {label: 'truncate', value: 'truncate'},
      {label: 'append', value: 'append'},
      {label: 'nonConflict', value: 'nonConflict'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'truncate':
          return 'truncate'
        case 'append':
          return 'append'
        case 'nonConflict':
          return 'nonConflict'
        default:
          return val
      }
    }
  },
  dbfCompress: {
    list: [
      {label: 'NONE', value: 'NONE'},
      {label: 'ZIP', value: 'ZIP'},
      {label: 'GZIP', value: 'GZIP'},
      {label: 'BZIP2', value: 'BZIP2'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'NONE':
          return 'NONE'
        case 'ZIP':
          return 'ZIP'
        case 'GZIP':
          return 'GZIP'
        case 'BZIP2':
          return 'BZIP2'
        default:
          return val
      }
    }
  },
  fileType: {
    list: [
      {label: 'orc', value: 'orc'},
      {label: 'parquet', value: 'parquet'},
      {label: 'text', value: 'text'},
      {label: 'csv', value: 'csv'},
      {label: 'rc', value: 'rc'},
      {label: 'seq', value: 'seq'}
    ],
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    getName: function (val) {
      switch (val) {
        case 'orc':
          return 'orc'
        case 'parquet':
          return 'parquet'
        case 'text':
          return 'text'
        case 'csv':
          return 'csv'
        case 'rc':
          return 'rc'
        case 'seq':
          return 'seq'
        default:
          return val
      }
    }
  },
  fieldDelimiter: {
    list: [
      {label: ',', value: ','},
      {label: '\\u0001', value: 'u0001'},
      {label: '\\t', value: 't'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case ',':
          return ','
        case 'u0001':
          return '\\u0001'
        case 't':
          return '\\t'
        default:
          return val
      }
    }
  },
  compress: {
    getName: function (val) {
      switch (val) {
        case 'orc':
          return ['NONE','ZLIB','SNAPPY','LZO','LZ4']
        case 'csv':
          return ['NONE','GZIP','BZIP2']
        case 'parquet':
          return ['NONE','SNAPPY','GZIP','LZO','BROTLI','LZ4','ZSTD']
        case 'text':
          return ['NONE','GZIP','BZIP2']
        case 'rc':
          return ['NONE','ZLIB','SNAPPY','LZO','LZ4']
        case 'seq':
          return ['NONE','ZLIB','SNAPPY','LZO','LZ4']
        default:
          return val
      }
    }
  },
  haveKerberos: {
    list: [
      {label: 'true', value: true},
      {label: 'false', value: false},
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case true:
          return 'true'
        case false:
          return 'false'
        default:
          return val
      }
    }
  },
  nullMode: {
    list: [
      {label: 'skip', value: 'skip'},
      {label: 'empty', value: 'empty'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    getName: function (val) {
      switch (val) {
        case 'skip':
          return 'skip'
        case 'empty':
          return 'empty'
        default:
          return val
      }
    }
  },
  // ---------------- ParamsType枚举  开始 -------------------  参数类型
  fieldType: {
    // 枚举列表
    list: [
      {label: 'String', value: 'String'},
      {label: 'Decimal', value: 'Decimal'},
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'String':
          return 'String'
        case 'Decimal':
          return 'Decimal'
        default:
          return val
      }
    }
  },

  resultStatus: {
    list: [
      {label: '未完成', value: 0},
      {label: '成功', value: 1},
      {label: '失败', value: 2}
    ],
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    getName: function (val) {
      switch (val) {
        case 0:
          return '未完成'
        case 1:
          return '成功'
        case 2:
          return '失败'
        default:
          return val
      }
    },
    getTag: function (val) { //使用el-tag时 类型
      switch (val) {
        case 1:
          return 'success'
        case 2:
          return 'danger'
        case 0:
          return 'info'
        default:
          return val
      }
    }
  },

  nrdbType: {
    list: [
      {label: 'HDFS', value: 7},
      {label: 'DBF', value: 8},
      {label: 'Hbase2.0withphoenix', value: 9}
    ],
    allList: function () {
      return [{label: '请选择', value: ''}].concat(this.list)
    },
    getName: function (val) {
      switch (val) {
        case 7:
          return 'jdbc:hdfs'
        case 8:
          return 'jdbc:dbf'
        case 9:
          return 'jdbc:hbase2.0withphoenix'
        default:
          return val
    }
  }
},








































   // ---------------- InformationChangeStatus枚举  开始 -------------------
   InformationChangeStatus: {
    // 枚举列表
    list: [
      {label: '待审核', value: 'WAIT'},
      {label: '审核通过', value: 'PASS'},
      {label: '审核不通过', value: 'NOT_PASS'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'WAIT':
          return '待审核'
        case 'PASS':
          return '审核通过'
        case 'NOT_PASS':
          return '审核不通过'
        default:
          return val
      }
    }
  },
  // ---------------- roleStatus 账号角色  开始 -------------------
  roleStatus: {
    list: [
      {label: '管理员', value: '1'},
      {label: '普通用户', value: '2'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case '1':
          return '管理员'
        case '2':
          return '普通用户'
        default:
          return val
      }
    }
  },
   // ---------------- sourceStatus 数据源状态  开始 -------------------
  sourceStatus: {
    list: [
      {label: '正常', value: '1'},
      {label: '异常', value: '2'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case '1':
          return '正常'
        case '2':
          return '异常'
        default:
          return val
      }
    },
    getTag: function (val) { //使用el-tag时 类型
      switch (val) {
        case '1':
          return 'success'
        case '2':
          return 'danger'
        default:
          return val
      }
    }
  },
   // ---------------- ApplyStatus枚举  开始 -------------------  应用状态
  ApplyStatus: {
    // 枚举列表
    list: [
      {label: '删除', value: 0},  
      {label: '上线', value: 1},
      {label: '下线', value: 2},
      {label: '待上线', value: 3},
    ],
    userList: [
      {label: '上线', value: 1},
      {label: '下线', value: 2},
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 0:
          return '删除'
        case 1:
          return '上线'
        case 2:
          return '下线'
        case 3:
          return '待上线'
        default:
          return val
      }
    },
    getTag: function (val) { //使用el-tag时 类型
      switch (val) {
        case 0:
          return 'danger'
        case 1:
          return 'success'
        case 2:
          return 'info'
        case 3:
          return 'warning'
        default:
          return val
      }
    },
  },
  // ---------------- InterFaceStatus枚举  开始 -------------------  用户应用状态
  UserApplyStatus: {
    // 枚举列表
    list: [
      {label: '上线', value: 1},
      {label: '下线', value: 2},
      {label: '待上线', value: 3}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 1:
          return '上线'
        case 2:
          return '下线'
        case 3:
          return '待上线'
        default:
          return val
      }
    },
    getTag: function (val) { //使用el-tag时 类型
      switch (val) {
        case 0:
          return 'danger'
        case 1:
          return 'success'
        case 2:
          return 'info'
        case 3:
          return 'warning'
        default:
          return val
      }
    },
  },
 // ---------------- auditedStatus枚举  开始 -------------------  审核状态
 AuditedStatus: {
  // 枚举列表
  list: [
    {label: '待审核', value: 0},
    {label: '审核通过', value: 1},
    {label: '审核不通过', value: 2},
  ],
  // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 0:
          return '待审核'
        case 1:
          return '审核通过'
        case 2:
          return '审核不通过'
        default:
          return val
      }
    },
    getTag: function (val) { //使用el-tag时 类型
      switch (val) {
        case 0:
          return 'warning'
        case 1:
          return 'success'
        case 2:
          return 'info'
        default:
          return val
      }
    }
  },
  // ---------------- ApplyType枚举  开始 -------------------  应用类型
  ApplyType: {
    // 枚举列表
    list: [
      {label: 'PC端应用', value: 1},
      {label: '移动端应用', value: 2}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 1:
          return 'PC端应用'
        case 2:
          return '移动端应用'
        default:
          return val
      }
    }
  },

  // ---------------- ParamsType枚举  开始 -------------------  参数类型
  ParamsType: {
    // 枚举列表
    list: [
      {label: 'String', value: 'String'},
      {label: 'Integer', value: 'Integer'},
      {label: 'Double', value: 'Double'},
      {label: 'Float', value: 'Float'},
      {label: 'Long', value: 'Long'},
      {label: 'Decimal', value: 'Decimal'},
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'String':
          return 'String'
        case 'Integer':
          return 'Integer'
        case 'Double':
          return 'Double'
        case 'Float':
          return 'Float'
        case 'Long':
          return 'Long'
        case 'Decimal':
          return 'Decimal'
        default:
          return val
      }
    }
  },


  // ---------------- InterFaceStatus枚举  开始 -------------------  接口状态
  InterFaceStatus: {
    // 枚举列表
    list: [
      {label: '删除', value: 0},
      {label: '启用', value: 1},
      {label: '停用', value: 2},
      {label: '待上线', value: 3}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 0:
          return '删除'
        case 1:
          return '启用'
        case 2:
          return '停用'
        case 3:
          return '待上线'
        default:
          return val
      }
    },
    getTag: function (val) { //使用el-tag时 类型
      switch (val) {
        case 0:
          return 'danger'
        case 1:
          return 'success'
        case 2:
          return 'info'
        case 3:
          return 'warning'
        default:
          return val
      }
    },
  },
  // ---------------- InterFaceStatus枚举  开始 -------------------  用户接口状态
  UserInterFaceStatus: {
    // 枚举列表
    list: [
      {label: '删除', value: 0},
      {label: '启用', value: 1},
      {label: '停用', value: 2}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 0:
          return '删除'
        case 1:
          return '启用'
        case 2:
          return '停用'
        default:
          return val
      }
    },
    getTag: function (val) { //使用el-tag时 类型
      switch (val) {
        case 0:
          return 'danger'
        case 1:
          return 'success'
        case 2:
          return 'info'
        case 3:
          return 'warning'
        default:
          return val
      }
    },
  },
  // ---------------- InterOriginStatus枚举  开始 -------------------  接口来源
  InterOriginStatus: {
    // 枚举列表
    list: [
      {label: '接口平台', value: 1},
      {label: '自定义', value: 2}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 1:
          return '接口平台'
        case 2:
          return '自定义'
        default:
          return val
      }
    }
  },

   // ---------------- echartDate枚举  开始 -------------------  echart时间
  echartDate: {
    // 枚举列表
    list: [
      {label: '7天', value: 1},
      {label: '30天', value: 2},
      {label: '6个月', value: 3},
      {label: '一年', value: 4}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 1:
          return '7天'
        case 2:
          return '30天'
        case 3:
          return '6个月'
        case 4:
          return '一年'
        default:
          return val
      }
    }
  },
    // ---------------- longCacheStatus  开始 -------------------  超长数据缓存
  longCacheStatus: {
    // 枚举列表
    list: [
      {label: '开启', value: 1},
      {label: '关闭', value: 2}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 1:
          return '开启'
        case 2:
          return '关闭'
        default:
          return val
      }
    }
  },
}
