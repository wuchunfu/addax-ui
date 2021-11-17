

//不同的数据库
export default {
  reader: {
    1: {
      name: 'RDBMS',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        splitPk: '',
        where: '1=1',
        querySql: '',
        fetchSize: '20480'
      },
      form: [
        {label: 'splitPk', model:'splitPk',disabled: false, value: '', placeholder:"使用splikPK代表的字段进行数据分片",type: 'input', require: []},
        {label: 'where条件', model:'where', disabled: false, value: '1=1', placeholder:"针对表的筛选条件，不需要再加where",type: 'textarea', require: []},
        {label: 'querySql', model:"querySql", disabled: false, value: '', placeholder:"使用自定义的SQL而不是指定表来获取数据，当配置了这一项之后，DataX系统就会忽略table，column这些配置项",type: 'textarea', require: []},
        {label: 'fetchSize', model:"fetchSize", disabled: false, value: '20480', placeholder:"",type: 'input', require: []}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            splitPk: this.data.splitPk,
            connection: [{
              table: this.data.table,
              jdbcUrl: this.data.jdbcUrl
            }],
            fetchSize: this.data.fetchSize,
            where: this.data.where,
            querySql: this.data.querySql
          }
        }
      }
    },
    2: {
      name: 'Oracle',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        splitPk: '',
        where: '1=1',
        querySql: '',
        fetchSize: '20480',
        session: ''
      },
      form: [
        {label: 'splitPk', model:'splitPk',disabled: false, value: '', placeholder:"使用splikPK代表的字段进行数据分片",type: 'input', require: [{required: false, message: '请输入splikPK', trigger: ['blur', 'change']}]},
        {label: 'where条件', model:'where', disabled: false, value: '1=1', placeholder:"针对表的筛选条件，不需要再加where",type: 'textarea', require: []},
        {label: 'querySql', model:"querySql", disabled: false, value: '', placeholder:"使用自定义的SQL而不是指定表来获取数据，当配置了这一项之后，DataX系统就会忽略table，column这些配置项",type: 'textarea', require: []},
        {label: 'fetchSize', model:"fetchSize", disabled: false, value: '20480', placeholder:"",type: 'input', require: []},
        {label: 'session',model:'session',disabled: false, value: '', type: 'textarea', require: [],placeholder:"针对本地连接,修改会话配置"}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            splitPk: this.data.splitPk,
            connection: [{
              table: this.data.table,
              jdbcUrl: this.data.jdbcUrl
            }],
            where: this.data.where,
            querySql: this.data.querySql,
            fetchSize: this.data.fetchSize,
            session: this.data.session
          }
        }
      }
    },
    3: {
      name: 'mysql',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        splitPk: '',
        where: '1=1',
        querySql: '',
      },
      form: [
        {label: 'splitPk', model:'splitPk',disabled: false, value: '', placeholder:"使用splikPK代表的字段进行数据分片",type: 'input', require: [{required: false, message: '请输入splikPK', trigger: ['blur', 'change']}]},
        {label: 'where条件', model:'where', disabled: false, value: '1=1', placeholder:"针对表的筛选条件，不需要再加where",type: 'textarea', require: []},
        {label: 'querySql', model:"querySql", disabled: false, value: '', placeholder:"使用自定义的SQL而不是指定表来获取数据，当配置了这一项之后，DataX系统就会忽略table，column这些配置项",type: 'textarea', require: []}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            splitPk: this.data.splitPk,
            connection: [{
              table: this.data.table,
              jdbcUrl: this.data.jdbcUrl
            }],
            where: this.data.where,
            querySql: this.data.querySql
          }
        }
      }
    },
    4: {
      name: 'SQLServer',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        splitPk: '',
        where: '1=1',
        querySql: '',
        fetchSize: '20480'
      },
      form: [
        // {label: 'needPassword', model:"needPassword", disabled: false, value: true, placeholder:"",type: 'input', require: []},
        {label: 'splitPk', model:'splitPk',disabled: false, value: '', placeholder:"使用splikPK代表的字段进行数据分片",type: 'input', require: []},
        {label: 'where条件', model:'where', disabled: false, value: '1=1', placeholder:"针对表的筛选条件，不需要再加where",type: 'textarea', require: []},
        {label: 'querySql', model:"querySql", disabled: false, value: '', placeholder:"使用自定义的SQL而不是指定表来获取数据，当配置了这一项之后，DataX系统就会忽略table，column这些配置项",type: 'textarea', require: []},
        {label: 'fetchSize', model:"fetchSize", disabled: false, value: '20480', placeholder:"",type: 'input', require: []}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            splitPk: this.data.splitPk,
            connection: [{
              table: this.data.table,
              jdbcUrl: this.data.jdbcUrl
            }],
            // needPassword: this.data.needPassword,
            fetchSize: this.data.fetchSize,
            where: this.data.where,
            querySql: this.data.querySql
          }
        }
      }
    },
    5: {
      name: 'PostgreSQL',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        splitPk: '',
        where: '1=1',
        querySql: '',
        fetchSize: '20480'
      },
      form: [
        // {label: 'needPassword', model:"needPassword", disabled: false, value: true, placeholder:"",type: 'input', require: []},
        {label: 'splitPk', model:'splitPk',disabled: false, value: '', placeholder:"使用splikPK代表的字段进行数据分片",type: 'input', require: []},
        {label: 'where条件', model:'where', disabled: false, value: '1=1', placeholder:"针对表的筛选条件，不需要再加where",type: 'textarea', require: []},
        {label: 'querySql', model:"querySql", disabled: false, value: '', placeholder:"使用自定义的SQL而不是指定表来获取数据，当配置了这一项之后，DataX系统就会忽略table，column这些配置项",type: 'textarea', require: []},
        {label: 'fetchSize', model:"fetchSize", disabled: false, value: '20480', placeholder:"",type: 'input', require: []}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            splitPk: this.data.splitPk,
            connection: [{
              table: this.data.table,
              jdbcUrl: this.data.jdbcUrl
            }],
            // needPassword: this.data.needPassword,
            fetchSize: this.data.fetchSize,
            where: this.data.where,
            querySql: this.data.querySql
          }
        }
      }
    },
    6: {
      name: 'ClickHouse',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        splitPk: '',
        where: '1=1',
        querySql: '',
      },
      form: [
        {label: 'splitPk', model:'splitPk',disabled: false, value: '', placeholder:"使用splikPK代表的字段进行数据分片",type: 'input', require: []},
        {label: 'where条件', model:'where', disabled: false, value: '1=1', placeholder:"针对表的筛选条件，不需要再加where",type: 'textarea', require: []},
        {label: 'querySql', model:"querySql", disabled: false, value: '', placeholder:"使用自定义的SQL而不是指定表来获取数据，当配置了这一项之后，DataX系统就会忽略table，column这些配置项",type: 'textarea', require: []},
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            splitPk: this.data.splitPk,
            connection: [{
              table: this.data.table,
              jdbcUrl: this.data.jdbcUrl
            }],
            // needPassword: this.data.needPassword,
            where: this.data.where,
            querySql: this.data.querySql
          }
        }
      }
    },
    //HDFS
    7: {
      name: 'HDFS',
      data: {
        path: '',
        defaultFS: '',
        fileType: 'orc',
        column: '',
        fieldDelimiter:`\\u0001`,
        encoding: 'utf-8',
        nullFormat: '',
        haveKerberos: false,
        kerberosKeytabFilePath: '',
        kerberosPrincipal: '',
        compress: 'snappy',
        hadoopConfig: ''
      },
      form: [
        {label: 'path',model:'path',disabled: false, value: '', type: 'input', require: [{required: true, message: '请输入path', trigger: ['blur', 'change']}],placeholder:"文件路径"},
        {label: 'defaultFS',model:'defaultFS',disabled: false, value: '', type: 'input', require: [{required: true, message: '请输入defaultFS', trigger: ['blur', 'change']}], placeholder:"defaultFS"},
        {label: 'fileType',model:'fileType',disabled: false, value: '', type: 'select', enumType: 'fileType',require: [{required: true, message: '请选择fileType', trigger: ['blur', 'change']}], placeholder:""},
        {label: 'fieldDelimiter',model:'fieldDelimiter',disabled: false, value: '', type: 'select',enumType: 'fieldDelimiter',require: [], placeholder: ''},
        {label: 'encoding',model:'encoding',disabled: false, value: '', type: 'input', require: [], placeholder: '文件编码',},
        {label: 'nullFormat',model:'nullFormat',disabled: false, value: '', type: 'input', require: [], placeholder: '定义哪个字符串可以表示为null',},
        {label: 'haveKerberos',model:'haveKerberos',disabled: false, value: '', type: 'select', enumType: 'haveKerberos', change: 'kerberosChange', require: [], placeholder: '是否有Kerberos认证，默认false',},
        {label: 'kerberosKeytabFilePath',model:'kerberosKeytabFilePath',disabled: true, value: '', type: 'input', require: [], placeholder: 'Kerberos认证 keytab文件路径',},
        {label: 'kerberosPrincipal',model:'kerberosPrincipal',disabled: true, value: '', type: 'input', require: [], placeholder: 'Kerberos认证Principal名',},
        {label: 'compress',model:'compress',disabled: false, value: '', type: 'select', enumType: 'compress', enumValue: 'fileType',require: [], placeholder: '',},
        {label: 'hadoopConfig',model:'hadoopConfig',disabled: false, value: '', type: 'input',require: [], placeholder: '配置与 Hadoop 相关的一些高级参数',}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            path: this.data.path,
            defaultFS: this.data.defaultFS,
            column: '',
            fileType: this.data.fileType,
            fieldDelimiter: this.data.fieldDelimiter,
            encoding: this.data.encoding,
            nullFormat: this.data.nullFormat,
            haveKerberos: this.data.haveKerberos,
            kerberosKeytabFilePath: this.data.kerberosKeytabFilePath,
            kerberosPrincipal: this.data.kerberosPrincipal,
            compress: this.data.compress,
            hadoopConfig: this.data.hadoopConfig
          }
        }
      }
    },
    //DBF
    8: {
      name: 'DBF',
      data: {
        path: '',
        column: '',
        compress: '',
        encoding: 'utf-8',
        nullFormat: '\\N',
        dbversion: ''
      },
      form: [
        {label: 'path',model:'path',disabled: false, value: '', type: 'input', require: [{required: true, message: '请输入path', trigger: ['blur', 'change']}],placeholder:"DBF文件路径"},
        {label: 'compress',model:'compress',disabled: false, value: '', type: 'select', enumType: 'dbfCompress',require: [{required: true, message: '请选择compress', trigger: ['blur', 'change']}], placeholder:""},
        {label: 'encoding',model:'encoding',disabled: false, value: '', type: 'input', require: [], placeholder: 'DBF文件编码',},
        {label: 'nullFormat',model:'nullFormat',disabled: false, value: '', type: 'input', require: [], placeholder: '定义哪个字符串可以表示为null',},
        {label: 'dbversion',model:'dbversion',disabled: false, value: '', type: 'input', require: [], placeholder: '指定DBF文件版本，不指定则自动猜测',}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            path: this.data.path,
            column: '',
            compress: this.data.compress,
            encoding: this.data.encoding,
            nullFormat: this.data.nullFormat,
            dbversion: this.data.dbversion
          }
        }
      }
    },
    //hbase20xsql
    9: {
      name: 'hbase20xsql',
      data: {
        queryServerAddress: '',
        serialization: 'PROTOBUF',
        table: '',
        schema: '',
        column: '',
        splitKey: '',
        splitPoints: '',
        where: '',
        querySql: ''
      },
      form: [
        {label: 'queryServerAddress',model:'queryServerAddress',disabled: false, value: '', type: 'input', require: [{required: true, message: '请输入queryServerAddress', trigger: ['blur', 'change']}],placeholder:"Phoenix QueryServer 地址"},
        {label: 'serialization',model:'serialization',disabled: false, value: '', type: 'input', require: [], placeholder:"QueryServer使用的序列化协议"},
        {label: 'splitKey',model:'splitKey',disabled: false, value: '', type: 'input', require: [{required: true, message: '请输入splitKey', trigger: ['blur', 'change']}], placeholder: '根据数据特征动态指定切分点，对表数据按照指定的列的最大、最小值进行切分,仅支持整型和字符串类型',},
        {label: 'splitPoints',model:'splitPoints',disabled: false, value: '', type: 'input', require: [], placeholder: '按照表的split进行切分',},
        {label: 'where',model:'where',disabled: false, value: '', type: 'textarea', require: [], placeholder: '支持对表查询增加过滤条件，每个切分都会携带该过滤条件',},
        {label: 'querySql',model:'querySql',disabled: false, value: '', type: 'textarea', require: [], placeholder: '支持指定多个查询语句，但查询列类型和数目必须保持一致',}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            queryServerAddress: this.data.queryServerAddress,
            serialization: this.data.serialization,
            splitKey: this.data.splitKey,
            table: this.data.table,
            schema: this.data.schema,
            column: this.data.column,
            splitPoints: this.data.splitPoints,
            where: this.data.where,
            querySql: this.data.querySql
          }
        }
      }
    }
  },
  writer: {
    1: {
      name: 'RDBMS',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        preSql: '',
        postSql: '',
        batchSize: '2048'
      },
      form: [
        {label: 'preSql',model:'preSql',disabled: false, value: '', type: 'textarea', require: [], placeholder:"文本框初始化文字：数据写入前先执行的sql语句"},
        {label: 'postSql',model:'postSql',disabled: false, value: '', type: 'textarea', require: [], placeholder:"文本框初始化文字：数据写入完成后执行的sql语句"},
        {label: 'batchSize',model:'batchSize',disabled: false, value: '2048', type: 'input', require: [], placeholder: '',}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            table: this.data.table,
            preSql: Array.of(this.data.preSql),
            connection: [
              {
                jdbcUrl: this.data.jdbcUrl,
                table: this.data.table
              }
            ]
          }
        }
      }
    },
    2: {
      name: 'Oracle',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        preSql: '',
        postSql: '',
        batchSize: '2048',
        session: ''
      },
      form: [
        {label: 'preSql',model:'preSql',disabled: false, value: '', type: 'textarea', require: [], placeholder:"数据写入前先执行的sql语句"},
        {label: 'postSql',model:'postSql',disabled: false, value: '', type: 'textarea', require: [], placeholder:"数据写入完成后执行的sql语句"},
        {label: 'batchSize',model:'batchSize',disabled: false, value: '2048', type: 'input', require: [], placeholder: ''},
        {label: 'session',model:'session',disabled: false, value: '', type: 'input', require: [],placeholder:"设置oracle连接时的session信息"}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            session: Array.of(this.data.session),
            preSql: Array.of(this.data.preSql),
            batchSize: this.data.batchSize,
            postSql: this.data.postSql,
            connection: [
              {
                jdbcUrl: this.data.jdbcUrl,
                table: this.data.table
              }
            ]
          }
        }
      }
    },
    3: {
      name: 'mysql',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        session: '',
        preSql: '',
        postSql: '',
        writeMode: 'insert',
        batchSize: '2048'
      },
      form: [
        {label: 'session',model:'session',disabled: false, value: '', type: 'textarea', require: [],placeholder:"DataX在获取Mysql连接时，执行session指定的SQL语句，修改当前connection session属性"},
        {label: 'preSql',model:'preSql',disabled: false, value: '', type: 'textarea', require: [], placeholder:"文本框初始化文字：数据写入前先执行的sql语句"},
        {label: 'postSql',model:'postSql',disabled: false, value: '', type: 'textarea', require: [], placeholder:"文本框初始化文字：数据写入完成后执行的sql语句"},
        {label: 'writeMode',model:'writeMode',disabled: false, value: 'insert', type: 'select',enumType: 'mysqlwriteMode',require: [{required: true, message: '请选择writeMode', trigger: ['blur', 'change']}], placeholder: ''},
        {label: 'batchSize',model:'batchSize',disabled: false, value: '2048', type: 'input', require: [], placeholder: '',}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            writeMode: this.data.writeMode,
            username: '',
            password: '',
            column: this.data.column,
            session: Array.of(this.data.session),
            preSql: Array.of(this.data.preSql),
            connection: [
              {
                jdbcUrl: this.data.jdbcUrl,
                table: this.data.table
              }
            ]
          }
        }
      }
    },
    4: {
      name: 'SQLServer',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        splitPk: '',
        preSql: '',
        postSql: '',
        batchSize: '2048'
      },
      form: [
        {label: 'splitPk',model:'splitPk',disabled: false, value: '', type: 'input', require: [], placeholder: '使用splikPK代表的字段进行数据分片',},
        {label: 'preSql',model:'preSql',disabled: false, value: '', type: 'textarea', require: [], placeholder:"文本框初始化文字：数据写入前先执行的sql语句"},
        {label: 'postSql',model:'postSql',disabled: false, value: '', type: 'textarea', require: [], placeholder:"文本框初始化文字：数据写入完成后执行的sql语句"},
        {label: 'batchSize',model:'batchSize',disabled: false, value: '2048', type: 'input', require: [], placeholder: '',}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            preSql: Array.of(this.data.preSql),
            postSql: Array.of(this.data.postSql),
            connection: [
              {
                jdbcUrl: this.data.jdbcUrl,
                table: this.data.table
              }
            ]
          }
        }
      }
    },
    5: {
      name: 'PostgreSQL',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        preSql: '',
        postSql: '',
        batchSize: '2048'
      },
      form: [
        {label: 'preSql',model:'preSql',disabled: false, value: '', type: 'textarea', require: [], placeholder:"文本框初始化文字：数据写入前先执行的sql语句"},
        {label: 'postSql',model:'postSql',disabled: false, value: '', type: 'textarea', require: [], placeholder:"文本框初始化文字：数据写入完成后执行的sql语句"},
        {label: 'batchSize',model:'batchSize',disabled: false, value: '2048', type: 'input', require: [], placeholder: '',}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            preSql: Array.of(this.data.preSql),
            postSql: Array.of(this.data.postSql),
            connection: [
              {
                jdbcUrl: this.data.jdbcUrl,
                table: this.data.table
              }
            ]
          }
        }
      }
    },
    6: {
      name: 'ClickHouse',
      data: {
        jdbcUrl: '',
        username: '',
        password: '',
        // needPassword: '',
        table: '',
        column: '',
        batchSize: '2048'
      },
      form: [
        {label: 'batchSize',model:'batchSize',disabled: false, value: '2048', type: 'input', require: [], placeholder: '',}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            username: '',
            password: '',
            column: this.data.column,
            preSql: Array.of(this.data.preSql),
            batchSize: this.data.batchSize,
            connection: [
              {
                jdbcUrl: this.data.jdbcUrl,
                table: this.data.table
              }
            ]
          }
        }
      }
    },
    //HDFS
    7: {
      name: 'HDFS',
      data: {
        path: '',
        defaultFS: '',
        fileType: 'orc',
        fileName: 'datax',
        column: '',
        writeMode: 'overwrite',
        fieldDelimiter: '\\u0001',
        encoding: 'utf-8',
        nullFormat: '',
        haveKerberos: false,
        kerberosKeytabFilePath: '',
        kerberosPrincipal: '',
        compress: 'snappy',
        hadoopConfig: '',
        csvReaderConfig: ''
      },
      form: [
        {label: 'path',model:'path',disabled: false, value: '', type: 'input', require: [{required: true, message: '请输入path', trigger: ['blur', 'change']}],placeholder:"文件路径"},
        {label: 'defaultFS',model:'defaultFS',disabled: false, value: '', type: 'input', require: [{required: true, message: '请输入defaultFS', trigger: ['blur', 'change']}], placeholder:"defaultFS"},
        {label: 'fileType',model:'fileType',disabled: false, value: '', type: 'select', enumType: 'fileType',require: [{required: true, message: '请选择fileType', trigger: ['blur', 'change']}], placeholder:""},
        {label: 'fileName',model:'fileName',disabled: false, value: '', type: 'input', require: [{required: true, message: '请输入fileName', trigger: ['blur', 'change']}], placeholder:"HdfsWriter写入时的文件名"},
        {label: 'fieldDelimiter',model:'fieldDelimiter',disabled: false, value: '', type: 'select',enumType: 'fieldDelimiter',require: [{required: true, message: '请选择fieldDelimiter', trigger: ['blur', 'change']}], placeholder: ''},
        {label: 'writeMode',model:'writeMode',disabled: false, value: '', type: 'select',enumType: 'hdfswriteMode',require: [{required: true, message: '请选择writeMode', trigger: ['blur', 'change']}], placeholder: ''},
        {label: 'encoding',model:'encoding',disabled: false, value: '', type: 'input', require: [], placeholder: '文件编码',},
        {label: 'nullFormat',model:'nullFormat',disabled: false, value: '', type: 'input', require: [], placeholder: '定义哪个字符串可以表示为null',},
        {label: 'haveKerberos',model:'haveKerberos',disabled: false, value: '', type: 'select', enumType: 'haveKerberos', change: 'kerberosChange', require: [], placeholder: '是否有Kerberos认证，默认false',},
        {label: 'kerberosKeytabFilePath',model:'kerberosKeytabFilePath',disabled: true, value: '', type: 'input', require: [], placeholder: 'Kerberos认证 keytab文件路径',},
        {label: 'kerberosPrincipal',model:'kerberosPrincipal',disabled: true, value: '', type: 'input', require: [], placeholder: 'Kerberos认证Principal名',},
        {label: 'compress',model:'compress',disabled: false, value: '', type: 'select', enumType: 'compress', enumValue: 'fileType',require: [], placeholder: '',},
        {label: 'hadoopConfig',model:'hadoopConfig',disabled: false, value: '', type: 'input',require: [], placeholder: '配置与 Hadoop 相关的一些高级参数',},
        {label: 'csvReaderConfig',model:'csvReaderConfig',disabled: false, value: '', type: 'input',require: [], placeholder: '',}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            path: this.data.path,
            defaultFS: this.data.defaultFS,
            column: '',
            writeMode: this.data.writeMode,
            fileName: this.data.fileName,
            fileType: this.data.fileType,
            fieldDelimiter: this.data.fieldDelimiter,
            encoding: this.data.encoding,
            nullFormat: this.data.nullFormat,
            haveKerberos: this.data.haveKerberos,
            kerberosKeytabFilePath: this.data.kerberosKeytabFilePath,
            kerberosPrincipal: this.data.kerberosPrincipal,
            compress: this.data.compress,
            hadoopConfig: this.data.hadoopConfig,
            csvReaderConfig: this.data.csvReaderConfig
          }
        }
      }
    },
    //DBF
    8: {
      name: 'DBF',
      data: {
        path: '',
        column: '',
        fileName: '',
        writeMode: '',
        compress: '',
        encoding: 'utf-8',
        nullFormat: '\\N',
        dateFormat: '',
        fileFormat: ''
      },
      form: [
        {label: 'path',model:'path',disabled: false, value: '', type: 'input', require: [{required: true, message: '请输入path', trigger: ['blur', 'change']}],placeholder:"DBF文件路径"},
        {label: 'fileName',model:'fileName',disabled: false, value: '', type: 'input', require: [],placeholder:"DbfFileWriter写入的文件名"},
        {label: 'writeMode',model:'writeMode',disabled: false, value: '', type: 'select', enumType: 'dbfwriteMode',require: [{required: true, message: '请选择writeMode', trigger: ['blur', 'change']}], placeholder:""},
        {label: 'compress',model:'compress',disabled: false, value: '', type: 'select', enumType: 'dbfCompress',require: [{required: true, message: '请选择compress', trigger: ['blur', 'change']}], placeholder:""},
        {label: 'encoding',model:'encoding',disabled: false, value: '', type: 'input', require: [], placeholder: 'DBF文件编码，比如 GBK, UTF-8',},
        {label: 'nullFormat',model:'nullFormat',disabled: false, value: '', type: 'input', require: [], placeholder: '定义哪个字符串可以表示为null',},
        {label: 'dateFormat',model:'dateFormat',disabled: false, value: '', type: 'input', require: [], placeholder: '日期类型的数据序列化到文件中时的格式',},
        {label: 'fileFormat',model:'fileFormat',disabled: false, value: '', type: 'input', require: [], placeholder: '文件写出的格式，暂时只支持DBASE III',}
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            path: this.data.path,
            column: '',
            writeMode: this.data.writeMode,
            compress: this.data.compress,
            encoding: this.data.encoding,
            nullFormat: this.data.nullFormat,
            dateFormat: this.data.dateFormat,
            fileFormat: this.data.fileFormat
          }
        }
      }
    },
    //hbase20xsql
    9: {
      name: 'hbase20xsql',
      data: {
        queryServerAddress: '',
        serialization: 'PROTOBUF',
        table: '',
        schema: '',
        batchSize: '256',
        column: '',
        nullMode: 'skip'
      },
      form: [
        {label: 'queryServerAddress',model:'queryServerAddress',disabled: false, value: '', type: 'input', require: [{required: true, message: '请输入queryServerAddress', trigger: ['blur', 'change']}],placeholder:"Phoenix QueryServer 地址"},
        {label: 'serialization',model:'serialization',disabled: false, value: '', type: 'input', require: [], placeholder:"QueryServer使用的序列化协议"},
        {label: 'nullMode',model:'nullMode',disabled: false, value: '', type: 'select',enumType: 'nullMode',require: [{required: true, message: '请选择nullMode', trigger: ['blur', 'change']}], placeholder: '支持指定多个查询语句，但查询列类型和数目必须保持一致'},
      ],
      requestData () {
        return {
          name: '',
          parameter: {
            queryServerAddress: this.data.queryServerAddress,
            serialization: this.data.serialization,
            table: this.data.table,
            schema: this.data.schema,
            column: this.data.column,
            batchSize: this.data.batchSize,
            nullMode: this.data.nullMode
          }
        }
      }
    }
  }
}