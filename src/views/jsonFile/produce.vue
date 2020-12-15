<template lang="pug">
  .setup
    Steps(:active="active" :labels="stepsLabel")
    .setup-box()
      el-form(:model="pdData" label-width="120px" :rules="pdRules" ref="pdForm" style="width: 440px")
        el-form-item(label="创建人：" prop="creater")
          el-input(v-model="pdData.creater" placeholder="admin1" disabled)  
        el-form-item(label="JOSN文件描述：" prop="describe")
          el-input(v-model="pdData.describe")
        el-form-item(label="JSON文件名：" prop="fileName")
          el-select(v-model="pdData.fileName" placeholder="请选择" @change="fileNameChange")
            el-option(v-for="i in fileArr" :label="i.label" :value="i.value" :key="i.value") 
      .json-box
          pre {{jsonText}}
      el-row(style="margin-top: 20px; display:flex; justify-content: center;")
        el-button(type="primary" @click="$router.back()" style="margin-right: 20px;") 上一步
        el-button(type="primary" @click="jsonComplete") 完成
</template>

<script>
export default {
  data () {
    return {
      active: 3,
      stepsLabel:['数据库', '构建JSON', '生成JSON'],
      pdData: {
        creater: '',
        describe: '',
        fileName: ''
      },
      fileArr: [],
      dataList: [],
      pdRules: {
        creater: [{ required: true, message: '请输入创建人', trigger: ['blur','change'] }],
        fileName: [{ required: true, message: '请选择JSON文件名', trigger: ['blur','change'] }]
      },
      jsonText: ''
    }
  },
  methods: {
    dataClick () { //数据库tab

    },
    deployClick() { // 配置tab

    },
    async jsonComplete () {
      let taskId = this.$route.query.taskId
      let jsonDesc = this.pdData.describe
      let obj = {
        taskId,
        jsonDesc
      }
      await this.$post(this.$apis.updateJsonDesc, obj)
      this.$message.success('JSON文件已生成')
      this.$router.push({path: '/jsonfile'})
    },
    fileNameChange(val) {
      this.pdData.fileName = val
      this.jsonTextEvent()
    },
    jsonTextEvent () {
      let index = this.dataList.findIndex(item => {
        return item.jsonId === this.pdData.fileName
      })
      this.jsonText = JSON.parse(this.dataList[index].json)
    },
    async getDataEvent () {
      this.fileArr = []
      let taskId = this.$route.query.taskId
      if (taskId) {
        let obj = {
          jsonDesc: '',
          taskId: taskId
        }
        try {
          let resp =await this.$post(this.$apis.getAllGenerateJson, obj)
          this.dataList = resp.data
          this.fileArr =  this.dataList.map(item => {
            return {
              label: item.jsonName,
              value: item.jsonId
            }
          })
          this.pdData.creater = this.dataList[0].userName
          this.pdData.fileName =  this.dataList[0].jsonId
          this.jsonTextEvent()
        } catch(e) {
          console.log(e)
        }
      } else {
        return false
      }
      
    }
  },
  mounted () {
    this.getDataEvent()
  }
}
</script>

<style lang='sass' scoped>
.setup
  background: #f1f1f1
  position: relative
  /deep/ .handsontable td.htInvalid
    background-color: #ffffff !important
  &-box
    background: #ffffff
    margin-top: 10px
    box-sizing: border-box
    min-height: calc(100vh - 246px) 
    padding:  10px
    .json-box
      width: 85%
      background: #f1f1f1
      box-sizing: border-box
      padding: 20px 10px
      height: auto
</style>
