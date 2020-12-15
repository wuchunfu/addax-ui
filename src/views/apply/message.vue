<template lang="pug">
  ._detail
    ._detail-top
      sub-title(name="应用信息")
      ._inner-box
        el-form(label-width="100px")
          el-form-item(label="应用名称：")
            el-input(:value="selectData.appName" :disabled="true")
          el-form-item(label="AppId：")
            el-input(:value="selectData.appId" :disabled="true")
          el-form-item(label="AppKey：")
            el-input(:value="selectData.appKey" :disabled="true")
          el-form-item(label="应用状态：")
            el-input(:value="$enums['ApplyStatus'].getName(selectData.appStatus)" :disabled="true")
          el-form-item(label="应用类型：")
            el-input(:value="$enums['ApplyType'].getName(selectData.appType)" :disabled="true")
          el-form-item(label="所属用户：")
            el-input(:value="selectData.userName" :disabled="true")
          el-form-item(label="创建时间：")
            el-input(:value="selectData.createTime" :disabled="true")
          el-form-item(label="更新时间：")
            el-input(:value="selectData.modifyTime" :disabled="true")
          el-form-item(label="IP地址：")
            el-input(:value="selectData.whiteStr" :disabled="true" type="textarea" :rows="4")
          el-form-item(label="")
            span 仅支持Ip,多个用分号";"隔开，不支持正则表达式。正确示例：192.168.0.1;192.168.1.9，错误示例：192.168.1.*
    ._detail-bottom(class="mt20")
      sub-title(name="接口申请")
      .table-box
         yc-table(:table="table" @sort-change="sortChange")
    div(style="text-align:center" class="mt30")
      el-button(@click="$router.back()") 返回

    right-popup(:closeOnClickMask="true" v-model="ifDetailDialog" :info="info" :loading="loading" width="615px" title="接口详情")
</template>

<script>
  export default {
    data (vm) {
      return {
        ifDetailDialog: false, // 详情弹窗
        applyValue: [1, 2], //选择的应用
        selectData: {},
        info: {}, //详情数据
        table: {
          api: vm.$apis.getAppliedInterfaces,
          init: {
            appId: vm.$route.query.appId 
          },
          query: {
            selectId: null,
            interfaceName: null,
            interfaceStatus: null,
            interfaceType: null,
            reviewStatus: null,
            appId: vm.$route.query.appId 
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
            title: '序号',
            key: 'number',
            width: '60px',
            showTooltip: true
          },
          {
            title: 'selectId',
            key: 'selectId',
            showTooltip: true
          },{
            title: '接口名称',
            key: 'interfaceName',
            showTooltip: true,
          }, {
            title: '查询SQL',
            key: 'querySql',
            showTooltip: true
          }, {
            title: '接口状态',
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
      async getInfoData() {  //根据appId得到修改的初始数据
        if (this.$route.query.appId) {
          try {
            this.loadingInstance = this.$loading({
              target: '.layout__router',
              text: '数据加载中...',
            })
            let appId = this.$route.query.appId
            let resp = await this.$post(this.$apis.getApplicationInfo, {appId})
            this.selectData = resp.data
            this.loadingInstance.close()
          } catch(e) {
            console.log(e)
          }  
        }
      },
    },
    mounted() {
      this.getInfoData()
      this.$search(this.table)
    }
  }
</script>

<style lang='sass' scoped>
._detail
  &-top
    .form-box
      width: 80%
      box-sizing: border-box
      border-radius: 10px
      padding: 10px 40px 0 10px
      border: 1px solid $gray-dark
</style>