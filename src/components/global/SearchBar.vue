<template>
  <div class="search-box"
       v-if="!$_.isEmpty(searchData)">
    <el-card>
      <div class="form"
          v-for="(item,idx) in searchDataIsVisible"
          :key="idx">
        <div v-if="item.type === 'select'"
            class="select _wrap">
          <span class="text">{{item.title}}</span>
          <el-select v-model="queryData[item.model]"
                    :style="{'width': item.width}"
                    filterable
                    :clearable="item.enumType ? false : true"
                    :multiple="item.multiple"
          >
            <el-option v-for="i in (item.enumType ? $enums[item.enumType].allList() : item.option)"
                      :label="i.label"
                      :value="i.value"
                      :key="i.value" />
          </el-select>
        </div>
        <div v-if="item.type === 'cascader'"
            class="cascader _wrap">
          <span class="text">{{item.title}}</span>
          <el-cascader :style="{'width': item.width}"
                      @change="(value) => cascaderChange(value,item)"
                      v-model="item.model"
                      :options="item.option"
                      change-on-select />
        </div>
        <div v-if="item.type === 'dateSection'"
            class="date-section _wrap">
          <span class="text">{{item.title}}</span>
          <el-date-picker class="date input"
                          v-model="timedata"
                          type="datetimerange"
                          align="right"
                          unlink-panels
                          @change="(value) => dateChange(value,item)"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions" />
        </div>
        <div v-if="item.type === 'date'"
            class="date _wrap">
          <span class="text">{{item.title}}</span>
          <el-date-picker v-model="item.initialDate"
                          class="date"
                          :type="item.dateType"
                          @change="(value) => dateSingeChange(value,item)"
                          placeholder="选择时间" />
        </div>
        <div v-if="item.type === 'input'"
            class="input _wrap">
          <span class="text">{{item.title}}</span>
          <el-input 
                    v-model="queryData[item.model]"
                    :maxlength="item.maxlen ? item.maxlen : 100"
                    :style="{'width': item.width}"
                    :placeholder="item.placeholder"
                    :clearable="item.clear? true: false"
                    >
            <!-- <el-button @click="emitSearchChange"
                      slot="append"
                      icon="el-icon-search"></el-button> -->
            <!--<i @click="$search(table)" slot="suffix" class="el-input__icon el-icon-search"></i>-->
          </el-input>
        </div>
      </div>
      <div style="display:inline-block; margin-left: 10px; ">
        <el-button type="primary" @click="emitSearchChange">查询</el-button>
        <el-button plain @click="refreshEvent">重置</el-button>
      </div>
    </el-card>
    <div class="btn-box">
      <span class="ctrl-btn-left">
        <slot name="before" />
      </span>
      <span class="ctrl-btn-right">
        <slot name="after" />
      </span>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    searchData: {
      type: Array,
      default () {
        return []
      }
    },
    query: {
      type: Object,
      default () {
        return {}
      }
    },
    init: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    searchDataIsVisible () {
      return this.searchData.filter(t => !t.hide)
    }
  },
  data (vm) {
    return {
      // 多选日期
      timedata: [],
      initialDate: '',
      dates: [undefined, undefined],
      pickerOptions: {
        disabledDate (time) {
          let curDate = (new Date()).getTime()
          return time.getTime() > curDate
        },
        shortcuts: [{
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(new Date(new Date().setMonth(new Date().getMonth() - 1)))
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(new Date(new Date().setMonth(new Date().getMonth() - 3)))
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近六个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(new Date(new Date().setMonth(new Date().getMonth() - 6)))
            picker.$emit('pick', [start, end])
          }
        }]
      },
      queryData: vm.$_.cloneDeep(this.query)
    }
  },
  // watch: {
  //   query: {
  //     handler (val) {
  //       console.log(val)
  //       this.queryData = this.$_.cloneDeep(val)
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    emitSearchChange () { //搜索
      console.log(this.queryData)
      this.$emit('on-search-change', this.$_.cloneDeep(this.queryData))
    },
    emitRefreshChange () { //重置
      this.$emit('on-refresh-change', this.$_.cloneDeep(this.queryData))
    },
    onSelectClear (model) {
      this.queryData[model] = null
      // this.emitSearchChange()
    },
    // cascader 值改变的时候
    cascaderChange (val, item) {
      if (val.length) {
        this.queryData[item.modelName[0]] = val[0]
        this.queryData[item.modelName[1]] = val[1]
      } else {
        this.queryData[item.modelName[0]] = null
        this.queryData[item.modelName[1]] = null
      }
      // this.emitSearchChange()
    },
    // 日期选择控件切换的回调
    dateChange (val, item) {
      console.log(val, item)
        let obj  = {} 
       if (val === null) {
          obj[item.modelName[0]] = null
          obj[item.modelName[1]] = null
        } else {
          obj[item.modelName[0]] = this.$dayjs(val[0]).format(
            'YYYY-MM-DD 00:00:00'
          )
          obj[item.modelName[1]] = this.$dayjs(val[1]).format(
            'YYYY-MM-DD 23:59:59'
          )
        }
        this.queryData[item.modelName[0]] = obj[item.modelName[0]]
        this.queryData[item.modelName[1]] = obj[item.modelName[1]]
      // this.emitSearchChange()
    },
    // 日期单选控件切换的回调
    dateSingeChange (val, item) {
      if (item.dateType === 'year') {
        this.queryData[item.model] = this.$dayjs(val).format('YYYY')
      } else if (item.dateType === 'month') {
        this.queryData[item.model] = this.$dayjs(val).format('YYYY-MM')
      } else {
        this.queryData[item.model] = this.$dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      }
      // this.emitSearchChange()
    },
    refreshEvent () {
      for(let i in this.queryData) {
        if (Object.keys(this.init).length > 0) {
          if (this.init[i]) {
            this.queryData[i] = this.init[i]
          } else {
            this.queryData[i] = null
          }
        } else {
          this.queryData[i] = null
        } 
      }
      this.timedata = []
      this.initialDate = ''
      this.emitRefreshChange()
    }
  },
  mounted () {

    for (let i = 0; i < this.searchData.length; i++) {
      if (this.searchData[i].type === 'dateSection' && this.searchData[i].startDate) {
        this.date = [this.searchData[i].startDate, this.searchData[i].endDate]
      }
    }
  }
}
</script>

<style lang="sass">
  .search-box
    padding: 0 $defaultGap $defaultGap
    .btn-box
      padding: 4px 0
      @extend %clearfix
      .ctrl-btn-left
        display: inline-block
        float: left
      .ctrl-btn-right
        float: right
        display: inline-block
    .item
      margin-top: $defaultGap
    ._wrap
      display: inline-table
      .text
        background-color: #F5F7FA
        color: #909399
        vertical-align: middle
        display: table-cell
        position: relative
        border: 1px solid #DCDFE6
        border-radius: 4px 0 0 4px
        padding: 0 10px
        width: 1px
        white-space: nowrap
        font-size: 13px
      .el-input__inner
        border-radius: 0 4px 4px 0 !important
    .form
      display: inline-block
      margin-right: 10px
      margin-bottom: 4px
      // max-width: 20%
      // margin-top: $defaultGap
      vertical-align: top
    .date
      width: 160px
    .el-select
      width: 140px
      display: block
    .el-cascader
      width: 140px
      display: block
    .input
      width: 200px
</style>
