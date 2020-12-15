<template lang="pug">
  ._detail
    ._detail-top
      sub-title(name="应用信息")
      ._inner-box
        .form-box
          el-form(:model="selectData" label-width="120px" :rules="rules" ref="ifForm")
            el-form-item(label="应用名称：" prop="name")
              el-input(v-model="selectData.name" maxlength="100" show-word-limit)
            el-form-item(label="应用类型：" prop="mold")
              el-select(v-model="selectData.mold" placeholder="请选择")
                  el-option(v-for="i in $enums['ApplyType'].list" :label="i.label" :value="i.value" :key="i.value")
            el-form-item(label="IP地址：" prop="ipAll")
              el-input(v-model="selectData.ipAll" type="textarea" :rows="4" maxlength="200" show-word-limit)
            el-form-item(label="")
              span 仅支持Ip,多个用分号";"隔开，不支持正则表达式。正确示例：192.168.0.1;192.168.1.9，错误示例：192.168.1.*
    ._detail-bottom(class="mt20")
      sub-title(name="接口申请")
      .table-box
         yc-table(:table="table" @selection-change="interSelect" @sort-change="sortChange")
    div(style="text-align:center" class="mt30")
        el-button(@click="saveSumbit" type="primary") 提交申请
        el-button(@click="$router.back()") 取消
    right-popup(:closeOnClickMask="true" v-model="ifDetailDialog" :info="info" :loading="loading" width="615px" title="接口详情")
    el-dialog(:visible.sync="ipFlagDialog" title="输入IP地址有误" width="460px")
      div 
        p(v-for="(item, index) in validIp" :key="index" :style="item.flag ? 'color: #67C23A': 'color: #F56C6C'") {{item.value}}
          i(:class="item.flag ? 'el-icon-success' : 'el-icon-error'" style="margin-left: 10px;")
      div(style="text-align:center")
        el-button(@click="ipFlagDialog = false") 确定
</template>

<script>
  export default {
    data (vm) {
      return {
        ipFlagDialog: false, //ip验证
        validIp: [],
        ifDetailDialog: false, // 详情弹窗
        applyValue: [1, 2], //选择的应用
        selectData:{ //得到的数据
            name: '',
            mold: '',
            ipAll: ''
        },
        selectInter: [], //选中的接口表格的selectId
        info: {}, //详情数据
        rules: {
            name: [{ required: true, message: '请输入应用名称', trigger: ['blur','change'] }],
            mold: [{ required: true, message: '请选择应用类型', trigger: ['blur','change'] }],
            ipAll: [{ required: true, message: '请输入ip地址', trigger: ['blur','change'] }]
        },
        table: {
          api: vm.$apis.getApplyInterfaces,
          rowkey: 'selectId',
          selection: [],
          query: {
            selectId: null,
            interfaceName: null,
            interfaceStatus: null,
            interfaceType: null,
            reviewStatus: null
          },
          searchData: [{
            title: 'SelectId',
            model: 'selectId',
            type: 'input',
            placeholder: '请输入',
            width: '180px'
          },{
            title: '接口名称',
            model: 'interfaceName',
            type: 'input',
            placeholder: '请输入',
            width: '180px'
          },{
            title: '接口状态',
            type: 'select',
            model: 'interfaceStatus',
            enumType: 'InterFaceStatus',
            placeholder: '请选择',
            width: '160px'
          },{
            title: '接口来源',
            type: 'select',
            model: 'interfaceType',
            enumType: 'InterOriginStatus',
            placeholder: '请选择',
            width: '160px'
          }],
          columns: [
          {
            type: 'selection'
          },{
            title: 'selectId',
            key: 'selectId',
            showTooltip: true
          }, {
            title: '接口名称',
            key: 'interfaceName',
            showTooltip: true,
          }, {
            title: '查询SQL',
            key: 'querySql',
            showTooltip: true
          }, {
            title: '接口状态',
            // key: 'interfaceStatus',
            // enumType: 'InterFaceStatus',
            // showTooltip: true
            render: function (h, ctx) {
              return h('el-tag',{
                    attrs: {
                      type: vm.$enums['InterFaceStatus'].getTag(ctx.row.interfaceStatus)
                    }
                  }, vm.$enums['InterFaceStatus'].getName(ctx.row.interfaceStatus))
            }
          },{
            title: '数据源',
            key: 'dataSource',
            showTooltip: true
          }, {
            title: '接口来源',
            key: 'interfaceType',
            showTooltip: true,
            enumType: 'InterOriginStatus'
          }, {
            title: '接口调用次数',
            key: 'interfaceCallsNum',
            number: true,
            width: 200,
            showTooltip: true,
            sortable: true
          },{
            title: '操作',
            fixed: 'right',
            render: function (h, ctx) {
              let list = []
              list.push(h('el-button', {
                attrs: {
                  type: 'text'
                },
                class: {
                  green: true
                },
                on: {
                  click: vm.goDetail.bind(this, ctx.row.selectId)
                }
              }, '详情'))
              return list
            }
          }]
        },
        loading: false
      }
    },
    methods: {
      // @sort-change="sortChange"
      sortChange (val) {
        this.table.query.sortType = val
        this.table.pagination.pageNum = 1
        this.table.pagination.pageSize = 10
        this.$search(this.table)
      },
      saveSumbit () {
          this.$refs.ifForm.validate(async(valid) => {
              if (valid) {
                  let whiteList = this.selectData.ipAll.trim().split(';')
                  whiteList = whiteList.filter(_=>_)
                  let validIp = whiteList.map(item => {
                    if(this.$config.regexp.isValidIp.test(item)) {
                      return {value: item, flag: true}
                    } else {
                      return {value: item, flag: false}
                    }
                  })
                  if (validIp.some(item => !item.flag)) {
                    this.validIp = validIp
                    this.ipFlagDialog = true
                    return false
                  }
                  // whiteList = whiteList.filter(_=>_).map(w=>{return {whiteList: w}})
                  let wl = validIp.map(w => {return {whiteList: w.value}})
                  let obj = {
                    appName: this.selectData.name,
                    appType: this.selectData.mold,
                    whitelistList: wl
                  }
                  obj.interfaceList = this.selectInter
                  try{
                    let resp = await this.$post(this.$apis.userAppliAdd, obj)
                    this.$message({
                      message: resp.returnMsg,
                      type: 'success'
                    })
                    this.$router.push('/adminApply')
                  } catch(e) {
                    console.log(e)
                  }
                  
              } else {
                  this.$notify.warning({
                      title: '提示',
                      message: `请将信息填写完整后再提交！`,
                      duration: 3000
                  })
                  return false
              }
          })
      },
      regenAppKey () {
          
      },
      async goDetail (selectId) { //表格数据查看详情     
        try {
          this.ifDetailDialog = true
          this.loading = true
          let resp = await this.$post(this.$apis.getInterfaceInfo, {selectId})
          this.info = resp.data
          this.loading = false
        } catch(e) {
          console.log(e)
        }
      },
      interSelect (_s) {  // 多选的结果
        let ids = _s.map(item => {
          return { selectId: item.selectId }
        })
        this.selectInter = ids
      },
    },
    mounted () {
      this.$search(this.table)
    }
  }
</script>

<style lang='sass' scoped>
._detail
  &-top
    .form-box
</style>