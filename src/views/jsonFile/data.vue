<template lang="pug">
  .setup
    Steps(:active="active" :labels="stepsLabel")
    .setup-box
        .setup-item
          .pane-box
            el-form(:model="dataData" label-width="120px" :rules="dataRules" ref="dataForm")                            
              el-form-item(label="读取数据源：" prop="readSourceConfigId")
                el-select(v-model="dataData.readSourceConfigId" placeholder="请选择" @change="(val) => sourceChangeEvent(val, 'reader')")
                  el-option(v-for="i in sourceArr" :label="i.sourceConfigName" :value="i.sourceConfigId" :key="i.sourceConfigId")
              el-form-item(label="目标数据源：" prop="writerSourceConfigId")
                el-select(v-model="dataData.writerSourceConfigId" placeholder="请选择" @change="(val) => sourceChangeEvent(val, 'writer')")
                  el-option(v-for="i in sourceArr" :label="i.sourceConfigName" :value="i.sourceConfigId" :key="i.sourceConfigId")
              el-form-item
                  el-button(type="primary" @click="dataNext") 下一步

</template>

<script>
  export default {
    data () {
      return {
        active: 1,
        stepsLabel:['数据库', '构建JSON', '生成JSON'],
        //数据源
        dataName: 'yuan', // 数据源 tab
        dataRules: {
          readSourceConfigId: [{required: true, message: '请选择读取数据源', trigger: ['blur','change']}],
          writerSourceConfigId: [{required: true, message: '请选择目标数据源', trigger: ['blur','change']}]
        }, // 表单规则
        dataData: {
          readSourceConfigId: '',
          readerType: '',
          writerSourceConfigId: '',
          writerType: ''
        }, // 数据源表单数据
        sourceArr: []   //数据源数组
      }
    },
    methods: {
      sourceChangeEvent(val, name){
        console.log(val,name)
        let sourceIndex = this.sourceArr.findIndex(item => {
          return item.sourceConfigId === val
        })
        if(sourceIndex >= 0) {
          if (name === 'reader') {
            this.dataData.readerType = this.sourceArr[sourceIndex].dataBaseType
          }
          if (name === 'writer') {
            this.dataData.writerType = this.sourceArr[sourceIndex].dataBaseType
          }
        } else {
          return false
        }
      },
      async getAllSource () { //获取数据源下拉列表
        let resp = await this.$get(this.$apis.getAllSourceConfig)
        console.log(resp)
        let data = resp.data
        this.sourceArr = data
      },
      dataNext () { //数据库下一步
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
              console.log(this.dataData)
              this.$router.push({name: 'setupjson', query: this.dataData})
          } else {
            return false
          }
        })
        
      },
      
      },
      mounted () {
        this.getAllSource()
      }
  }
</script>

<style lang='sass' scoped>
.setup
  background: #f1f1f1
  position: relative
  &-box
    background: #ffffff
    margin-top: 10px
    box-sizing: border-box
    min-height: calc(100vh - 246px) 
    .setup-item
      padding:  10px
      .pane-box
        padding-top: 20px
</style>
