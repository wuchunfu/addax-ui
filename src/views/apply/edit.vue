<template lang="pug">
  ._detail
    ._detail-top
      sub-title(name="应用信息")
      ._inner-box
        .form-box
          el-form(:model="selectData" label-width="120px" :rules="rules" ref="ifForm")
            el-form-item(label="应用名称：" prop="name")
              el-input(v-model="selectData.name" maxlength="100" show-word-limit)
            el-form-item(label="AppId：" prop="appId")
              el-input(v-model="selectData.appId" :disabled="true")
            el-form-item(label="AppKey：" prop="appKey")
              el-input(v-model="selectData.appKey" :disabled="true" style="width:60%;margin-right:20px;")
              el-button(@click="getCodeEvent" type="primary" size="small" :loading="btnLoading") 重新生成AppKey
            el-form-item(label="所属用户：" prop="userName")
              el-input(v-model="selectData.userName" :disabled="true")
            el-form-item(label="应用类型：" prop="mold")
              el-select(v-model="selectData.mold" placeholder="请选择")
                  el-option(v-for="i in $enums['ApplyType'].list" :label="i.label" :value="i.value" :key="i.value")
            el-form-item(label="应用状态：" prop="appStatus")
              el-radio-group(v-model="selectData.appStatus")
                el-radio(v-for="item in $enums['ApplyStatus'].userList" :label="item.value" :key="item.value") {{item.label}}
            el-form-item(label="IP地址：" prop="ipAll")
              el-input(v-model="selectData.ipAll" type="textarea" :rows="4" maxlength="200" show-word-limit)
            el-form-item(label="")
              span 仅支持Ip,多个用分号";"隔开，不支持正则表达式。正确示例：192.168.0.1;192.168.1.9，错误示例：192.168.1.*
    ._detail-bottom(class="mt20")
      sub-title(name="接口申请")
      .table-box
         yc-table(:table="table" @selection-change="interSelect" ref="ycTable" @sort-change="sortChange")
    div(style="text-align:center" class="mt30")
        el-button(@click="saveSumbit" type="primary") 保存
        el-button(@click="$router.back()") 取消
    right-popup(:closeOnClickMask="true" v-model="ifDetailDialog" :info="info" :loading="loading" width="615px" title="接口详情")
    el-dialog(:visible.sync="codeDialog" title="输入验证码" width="460px")
      el-form(:model="getCode" label-width="120px" :rules="codeRules" ref="codeForm")
        el-form-item(label="验证码：")
          div(class="code-box")
            SIdentify(:identifyCode="codeInit")
            div(class="shadow")
              i(@click="getDoubleCode" class="icon el-icon-refresh")
        el-form-item(label="输入验证码：" prop="code")
          el-input(v-model="getCode.code" style="width: 50%")
      <div slot="footer" class="dialog-footer">
        <el-button @click="codeDialog = false">取 消</el-button>
        <el-button type="primary" @click="appkeySumbit" :loading="btnLoading1">确定生成AppKey</el-button>
      </div>
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
        btnLoading: false,
        btnLoading1: false,
        ipFlagDialog: false, //ip验证
        validIp: [],
        codeDialog: false,//验证码弹窗
        codeInit: '',
        getCode: {code: '', key: '', appId: ''}, //验证码
        ifDetailDialog: false, // 详情弹窗
        applyValue: [1, 2], //选择的应用
        selectData:{ //得到的数据
            name: '',
            mold: '',
            appKey: '',
            appStatus: '',
            appId: '',
            ipAll: '',
            userName: ''
        },
        initSelectInter: [], //默认选中的值
        selectInter: [], //选中的接口表格的selectId
        info: {}, //详情数据
        rules: {
            name: [{ required: true, message: '请输入应用名称', trigger: ['blur','change'] }],
            mold: [{ required: true, message: '请选择应用类型', trigger: ['blur','change'] }],
            ipAll: [{ required: true, message: '请输入ip地址', trigger: ['blur','change'] }],
            appStatus: [{required: true, message: '', trigger: ['blur','change']}]
        },
        codeRules:{
          code: [{ required: true, message: '请输入验证码', trigger: ['blur','change'] }],
        },
        loadingInstance: null,
        table: {
          api: vm.$apis.getApplyInterfaces,
          rowkey: 'selectId',
          ref: '',
          selection: {
            init: [],
            done: []
          },
          init: {
            appId: vm.$route.query.appId 
          },
          query: {
            appId: vm.$route.query.appId,
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
      sortChange (val) {
        this.table.query.sortType = val
        this.table.pagination.pageNum = 1
        this.table.pagination.pageSize = 10
        this.$search(this.table)
      },
        appkeySumbit () { //重新生成APPkey提交
          this.$refs.codeForm.validate(async(valid) => {
            if (valid) {
              let appId = this.$route.query.appId
              if (appId) {
                try{
                  this.btnLoading1 = true
                  this.getCode.appId = appId
                  let resp = await this.$post(this.$apis.regAppKey, this.getCode)
                  this.selectData.appKey = resp.data
                  this.$message({
                    message: '已重新生成AppKey',
                    type: 'success'
                  })
                  this.btnLoading1 = false
                  this.codeDialog = false
                }catch(e) {
                  console.log(e)
                  this.btnLoading1 = false
                }
              } else {
                return false
              }
            }
          })
        },
        async getCodeEvent () { //重新生成APPkey 打开弹窗
          try {
            this.btnLoading = true
            this.getCode = {code: '', key: '', appId: ''}
            let resp = await this.$get(this.$apis.getCode)
            this.codeInit = resp.data.code
            this.getCode.key = resp.data.key
            this.codeDialog = true
            this.$refs.codeForm && this.$refs.codeForm.clearValidate()
            this.btnLoading = false
          }catch(e){
            console.log(e)
          }
        },
        async getDoubleCode () { // 换验证码
          try {
            let resp = await this.$get(this.$apis.getCode)
            this.codeInit = resp.data.code
            this.getCode.key = resp.data.key
            this.$refs.codeForm && this.$refs.codeForm.clearValidate()
          }catch(e){
            console.log(e)
          }
        },
        saveSumbit () { //提交
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
                      appStatus: this.selectData.appStatus,
                      appKey: this.selectData.appKey,
                      whitelistList: wl
                    }
                    obj.appId = this.$route.query.appId
                    let doneArr = this.table.selection.done
                    this.table.selection.init.forEach(_m => {
                      if (!doneArr.includes(_m.selectId) && _m.flag === 0) {
                        doneArr.push(_m.selectId)
                      }
                    })
                    this.selectInter = doneArr.map(_d => {
                      return {selectId: _d}
                    })
                    obj.interfaceList = this.selectInter
                    try{
                      await this.$post(this.$apis.updateApplication, obj)
                      this.$message({
                        message: '操作成功',
                        type: 'success'
                      })
                      this.$router.go(-1)
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
          return item.selectId
        })
        this.table.selection.done = ids
        // ids.forEach(_i => {
        //   if (!this.table.selection.done.includes(_i)) {
        //     this.table.selection.done
        //   }
        // })
        let doneArr = this.table.selection.done
        // for(let i in this.table.selection.done) {
        //   this.table.selection.done[i].forEach(item => {
        //     doneArr.push(item)
        //   })
        // }
        this.table.selection.init.forEach(_m => {
          if(!doneArr.includes(_m.selectId) && _m.flag === 1){
            _m.flag = 2
          }
        })
        // this.table.selection.done = arr
      },
      async getInfoData() {  //根据appId得到修改的初始数据
        if (this.$route.query.appId) {
          this.loadingInstance = this.$loading({
            target: '.layout__router',
            text: '数据加载中...',
          })
           let appId = this.$route.query.appId
           let resp = await this.$post(this.$apis.getApplicationInfo, {appId})
           let info = resp.data
           this.initFormData(info)
        }
      },
      initFormData (info) {
        this.selectData = {   //得到的数据
          name: info.appName,
          mold: info.appType,
          ipAll: info.whiteStr,
          appId: info.appId,
          appKey: info.appKey,
          appStatus: info.appStatus,
          userName: info.userName
        }
        this.table.selection.init = info.selectIdList.map(item => {
          return {selectId: item, flag: 0}  //flag: 0 没动 1 已选择 2 已取消
        })
        this.table.ref = this.$refs['ycTable']
        this.$search(this.table)
        this.loadingInstance.close()
      }
    },
    mounted () {
      this.getInfoData() 
    }
  }
</script>

<style lang='sass' scoped>
.code-box
  position: relative
  width: 112px
  height: 38px
  &:hover
    .shadow
      opacity: 1
  .shadow
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    font-size: 20px
    opacity: 0
    background: rgba(0, 0, 0, .3)
    color: #fff
    transition: all .3s
    text-align: center
    i
      cursor: pointer

</style>