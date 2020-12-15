

export default {
  // async loginManage (query) {   //用户登录接口
  //   return await Axios.post('/user/login', query)
  // },
  // async messageMqttRead (query) {  
  //   return await Axios.post('/messageMqtt/read', query)
  // }
  // 登录

  login: '/login/login', //用户登录接口
  register: '/login/register', //注册接口


  // 管理员端 首页
  getCounts: '/homePage/getCounts',  //首页头部数据
  getAllUsers: '/homePage/getAllUsersByHomePage',
  ifRank: '/homePage/getInterfaceCallRanking',
  statistics: '/homePage/getInterfaceStatistics',
  //重新生成AppKey
  getCode: '/application/code',  //获取验证码
  regAppKey: '/application/regenerateAppKey',  //重新生成AppKey
  
  //用户端

  //用户管理
  getUsers: '/user/getUsers', //管理员管理用户
  getUserInfo: '/user/getUserInfo', //个人中心

  //数据源
  delSourceConfig: '/sourceConfig/delSourceConfig', //删除数据源
  getAllSourceConfig: '/sourceConfig/getAllSourceConfig', //下拉-获取数据源
  sourceConfigList: '/sourceConfig/querySourceConfigListWithPage', //数据源管理列表-分页
  saveOrUpdateSource: '/sourceConfig/saveOrUpdateSourceConfig', //新增/编辑数据源

  //用户管理
  userList: '/user/queryUserListWithPage',

  //json
  jsonList: '/json/queryJsonListWithPage',  //json列表-分页
  updateJson: '/json/updateJsonInfo',


  //构建JSON
  generateJson: '/json/generateJson', //生成JSOn
  jsonProcess: '/json/getAllGenerateJsonProcess', //查询构建json进程-轮询
  getAllGenerateJson: '/json/getAllGenerateJson',  //查询已构建的json
  updateJsonDesc: '/json/updateJsonDesc', //编辑json文件描述
  taskList: '/json/querySubTaskListWithPage' //构建json进度列表-分页
}
