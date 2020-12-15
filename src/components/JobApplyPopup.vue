<template lang="pug">
  right-popup(v-model="visible", :title="isEditMode ? '编辑招聘岗位' : isAddMode ? '新增招聘岗位' : '招聘岗位详情'")
    el-form(
    :label-position="$config.formLabelPosition",
    label-width="100px"
    ref="form"
    :model="jobInfo"
    :rules="rules")
      el-form-item(label="岗位名称" prop="name")
        p(v-if="!isEditMode && !isAddMode") {{jobInfo.name}}
        el-input(v-else, v-model="jobInfo.name")
      el-form-item(label="招聘人数" prop="number")
        p(v-if="!isEditMode && !isAddMode") {{jobInfo.number}}人
        el-input(v-else, v-pos-int="jobInfo.number", v-model="jobInfo.number")
      el-form-item(label="岗位类别" prop="jobType")
        p(v-if="!isEditMode && !isAddMode") {{jobInfo.jobType}}
        el-input(v-else, v-model="jobInfo.jobType")
      el-form-item(label="岗位要求", label-position="top" prop="details")
        p.details(v-if="!isEditMode && !isAddMode") {{jobInfo.details}}
        el-input(v-else, type="textarea", :rows="$config.textAreaRows", v-model="jobInfo.details")
      el-form-item
        el-button(v-if="isEditMode", type="primary", @click="doEdit") 编辑
        el-button(v-else-if="isAddMode", type="primary", :loading="submitting", @click="doSave") 保存
        el-button(@click="doBack", v-if="!isEditMode") 返回
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: ''
      },
      jobInfo: {
        type: Object,
        required: true
      }
    },
    model: {
      prop: 'visible',
      event: 'update'
    },
    data () {
      return {
        submitting: false,
        job: {},
        // TODO 表单验证规则
        rules: {
          name: {
            required: true,
            message: '请输入岗位名称',
            trigger: 'blur'
          },
          number: {
            required: true,
            message: '请输入招聘人数',
            trigger: 'blur'
          },
          jobType: {
            required: true,
            message: '请输入岗位类别',
            trigger: 'blur'
          },
          details: {
            required: true,
            message: '请输入岗位要求',
            trigger: 'blur'
          }
        }
      }
    },
    computed: {
      rightPopupVisible: {
        get () {
          return this.visible
        },
        set (val) {
          this.$emit('update', val)
        }
      },
      isEditMode () {
        return this.mode === 'edit'
      },
      isAddMode () {
        return this.mode === 'add'
      },
      isDetailMode () {
        return this.mode === 'detail'
      }
    },
    methods: {
      // 保存
      doSave () {
        this.$refs.form.validate((valid) => {
          if (!valid) return
          this.rightPopupVisible = false
          this.$emit('done', this.jobInfo)
        })

      },
      // 编辑
      doEdit () {
        this.$emit('update:mode', 'edit')
      },
      doBack () {
        // if (this.isEditMode) this.$emit('update:isEditMode', false)
        // else this.rightPopupVisible = false
        this.rightPopupVisible = false
      }
    }
  }
</script>

<!--@formatter:off-->
<style lang='sass' scoped>

</style>
