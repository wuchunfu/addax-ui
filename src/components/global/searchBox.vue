<template>
  <div class="search-boxs">
    <slot name="before" />
    <div
      v-for="(item,key) in searchData"
      :key="key"
      class="form"
    >
      <div v-if="!item.hide">
        <div
          v-if="item.type === 'select'"
          class="select"
        >
          <span class="text">{{ item.title }}</span>
          <el-select
            v-model="table.query[item.model]"
            :style="{'width': item.width}"
            :clearable="!item.notRemove"
            filterable
            default-first-option
            @change="value => onChange(value, item)"
          >
            <el-option
              v-for="i in item.option"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
        </div>
        <div
          v-if="item.type ==='cascader'"
          class="cascader"
        >
          <span class="text">{{ item.title }}</span>
          <el-cascader
            v-model="item.model"
            :style="{'width': item.width}"
            :props="{checkStrictly: item.checkStrictly}"
            clearable
            :options="item.option"
            @change="(value) => cascaderChange(value,item)"
          />
        </div>
        <div
          v-if="item.type === 'dateSection'"
          class="date-section"
        >
          <span class="text">{{ item.title }}</span>
          <el-date-picker
            v-model="date"
            class="date input"
            type="daterange"
            align="right"
            unlink-panels
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="(value) => dateChange(value,item)"
          />
        </div>
        <div
          v-if="item.type === 'date'"
          class="date"
        >
          <span class="text">{{ item.title }}</span>
          <el-date-picker
            v-model="item.initialDate"
            :format="item.dateType === 'month' ? 'yyyy年MM月' : (item.dateType === 'year' ? 'yyyy年' : 'yyyy-MM-dd')"
            :clearable="!item.notRemove"
            class="date"
            :type="item.dateType"
            :picker-options="pickerYearOptions"
            :style="{'width': item.width}"
            placeholder="选择时间"
            @change="(value) => dateSingeChange(value,item)"
          />
        </div>
        <div
          v-if="item.type === 'input'"
          class="input"
        >
          <span class="text">关键字</span>
          <el-input
            v-model="table.query.keywords"
            :style="{'width': item.width}"
            :placeholder="item.placeholder"
            :clearable="!item.notRemove"
            @keyup.enter.native="$search(table)"
            @change="keywordsChange"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="$search(table)"
            />
            <!--<i @click="$search(table)" slot="suffix" class="el-input__icon el-icon-search"></i>-->
          </el-input>
        </div>
        <div
          v-if="item.type === 'non-keywords-input'"
          class="input"
        >
          <span class="text">{{ item.title }}</span>
          <el-input
            v-model="table.query[item.model]"
            :placeholder="item.placeholder"
            clearable
            @keyup.enter.native="$search(table)"
          />
        </div>
      </div>
    </div>
    <slot name="after" />
  </div>
</template>
<script>
  export default {
    props: {
      searchData: {
        default: null,
        type: Array
      },
      table: {
        default: null,
        type: Object
      }
    },
    data () {
      return {
        // 多选日期
        date: [undefined, undefined],
        dates: [undefined, undefined],
        pickerYearOptions: {
          disabledDate (date) {
            return date.getTime() >= Date.now()
          }
        },
        pickerOptions: {
          disabledDate (date) {
            return date.getTime() >= Date.now()
          },
          shortcuts: [
            {
              text: '最近一个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(
                  new Date(new Date().setMonth(new Date().getMonth() - 1))
                )
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近三个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(
                  new Date(new Date().setMonth(new Date().getMonth() - 3))
                )
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近六个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(
                  new Date(new Date().setMonth(new Date().getMonth() - 6))
                )
                picker.$emit('pick', [start, end])
              }
            }
          ]
        }
      }
    },
    mounted () {
      for (let i = 0; i < this.searchData.length; i++) {
        if (
          this.searchData[i].type === 'dateSection' &&
          (this.searchData[i].startDate ||
            this.searchData[i].startInboundDate ||
            this.searchData[i].reportStartDate ||
            this.searchData[i].beginDate ||
            this.searchData[i].startApplyDate ||
            this.searchData[i].startOutboundDate)
        ) {
          this.date = [
            this.searchData[i].startInboundDate ||
            this.searchData[i].reportStartDate ||
            this.searchData[i].beginDate ||
            this.searchData[i].startApplyDate ||
            this.searchData[i].startOutboundDate,
            this.searchData[i].endInboundDate ||
            this.searchData[i].reportEndDate ||
            this.searchData[i].endDate ||
            this.searchData[i].endApplyDate ||
            this.searchData[i].endOutboundDate
          ]
        }
      }
      for (let i = 0; i < this.searchData.length; i++) {
        if (
          this.searchData[i].type === 'dateSections' &&
          this.searchData[i].startDeliveryDate
        ) {
          this.dates = [
            this.searchData[i].startDeliveryDate,
            this.searchData[i].endDeliveryDate
          ]
        }
      }
    },
    methods: {
      // cascader 值改变的时候
      cascaderChange (val, item) {
        // TODO: 清空值时清除label
        // if (val.length) {
        //   if (item.withLastValue) {
        //     this.table.query[item.modelName[0]] = val[0]
        //     if (val.length > 1) {
        //       this.table.query[item.modelName[item.modelName.length - 1]] =
        //         val[val.length - 1]
        //     }
        //   } else if (item.onlyLastValue) {
        //     this.table.query[item.modelName] = val[val.length - 1]
        //   } else {
        //     this.table.query[item.modelName[0]] = val[0]
        //     this.table.query[item.modelName[1]] = val[1]
        //   }
        // } else {
        //   this.table.query[item.modelName[0]] = null
        //   this.table.query[item.modelName[1]] = null
        // }
        this.table.query.pageNo = 1
        console.log(item)
        this.table.query[item.modelName] = val[val.length - 1]
        this.$search(this.table)
      },
      // 日期选择控件切换的回调
      dateChange (val, item) {
        if (val === null) {
          this.table.query[item.modelName[0]] = null
          this.table.query[item.modelName[1]] = null
        } else {
          this.table.query[item.modelName[0]] = this.$dayjs(val[0]).format(
            'YYYY-MM-DD 00:00:00'
          )
          this.table.query[item.modelName[1]] = this.$dayjs(val[1]).format(
            'YYYY-MM-DD 23:59:59'
          )
        }
        this.table.query.pageNo = 1
        this.$search(this.table)
      },
      // 日期单选控件切换的回调
      dateSingeChange (val, item) {
        if (item.reportMonth) {
          this.table.query[item.model] = val && this.$dayjs(val).format('YYYY-MM')
        } else if (item.reportYear) {
          this.table.query[item.model] = val && this.$dayjs(val).format('YYYY')
        } else {
          this.table.query[item.model] = val && this.$dayjs(val).format(
            'YYYY-MM-DD hh:mm:ss'
          )
        }
        this.table.query.pageNo = 1
        this.$search(this.table)
      },
      // 关键字
      keywordsChange () {
        this.table.query.pageNo = 1
        this.$search(this.table)
      },
      async onChange (value, item) {
        if (String(value).indexOf(',') > -1) {
          let table = JSON.parse(JSON.stringify(this.table))
          table.query[item.model] = value.split(',').filter(t => t)
          this.table.query.pageNo = 1
          await this.$search(table)
          this.table.list = table.list
          this.table.noData = table.noData
          this.table.total = table.total
          return
        }
        this.$emit('title', value)
        this.table.query.pageNo = 1
        if (!value) {
          this.table.query[item.model] = null
        }
        this.$search(this.table)
      }
    }
  }
</script>
<style lang="sass">

</style>
<style lang="sass" scoped>
  .search-boxs
    padding: 5px 0 0px 0
    .item
      margin-top: 15px
    .text
      margin-left: 5px
      color: #666
      display: block
      font-size: 12px
      font-weight: bold
      margin-bottom: 2px
    .form
      display: inline-block
      margin-right: 10px
      margin-bottom: 15px
    .date
      width: 200px
      .el-date-editor
        width: 100% !important
    .el-select
      width: 140px
      display: block
    .el-cascader
      width: 200px
      display: block
    .input
      width: 250px !important
</style>
