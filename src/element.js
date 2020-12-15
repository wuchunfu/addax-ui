import Vue from 'vue'
import {
  Badge,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Dialog,
  Form,
  FormItem,
  Icon,
  Input,
  Loading,
  Message,
  MessageBox,
  Notification,
  Option,
  Pagination,
  Popover,
  Radio,
  RadioGroup,
  RadioButton,
  Row,
  Scrollbar,
  Select,
  Table,
  TableColumn,
  TimePicker,
  Tooltip,
  Upload,
  Progress,
  Tabs,
  TabPane,
  Card,
  Cascader
} from 'element-ui';

Vue.use(Badge)
  .use(Button)
  .use(Checkbox)
  .use(DatePicker)
  .use(Dialog)
  .use(Col)
  .use(Icon)
  .use(Input)
  .use(Pagination)
  .use(Option)
  .use(Row)
  .use(Scrollbar)
  .use(Table)
  .use(TableColumn)
  .use(Tooltip)
  .use(Upload)
  .use(Loading)
  .use(Select)
  .use(Form)
  .use(FormItem)
  .use(TimePicker)
  .use(RadioGroup)
  .use(Radio)
  .use(RadioButton)
  .use(Popover)
  .use(Progress)
  .use(Tabs)
  .use(TabPane)
  .use(Card)
  .use(Cascader);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$confirm = MessageBox.confirm;

let loading = null;
Vue.prototype.$layoutRouterLoading = isOpen => {
  if (isOpen) {
    loading = Loading.service({
      target: '.layout__router',
      text: '数据加载中...'
    })
  } else {
    loading.close()
  }
}

Vue.prototype.$viewImage = url => {
  if (!url) {
    return Notification.error({
      title: '错误',
      message: '未找到图片'
    })
  }
  const h = Vue.prototype.$h
  MessageBox({
    title: '',
    showCancelButton: false,
    showConfirmButton: false,
    showClose: false,
    customClass: 'img-msg-box',
    message: h('img', {
      attrs: {
        src: url,
        style: 'width: 100%'
      }
    })
  }).catch(e => {
    console.log(e);
  })
}
