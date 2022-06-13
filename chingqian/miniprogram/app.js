// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: cloud.DYNAMIC_CURRENT_ENV,
        traceUser: true,
      });
    }

    this.globalData = {
      userInfo: {},
      hasUserInfo: false,
      haveGetOpenId: false,
      openId: '',
      booklist:[],
      night_mode:false,
    };
  },
  
  processDate: function (date) {
    // date = date.toLocaleString("zh-cn", {
    //   timeZone: "Asia/Shanghai"
    // });
    date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },

  changeModel(flag){
    console.log('this is '+flag);
    if (flag) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 必写项【该字体颜色仅支持 #ffffff 和 #000000 】
        backgroundColor: '#000000', // 传递的颜色值【仅支持有效值为十六进制颜色】
        // animation: { // 可选项
        //   duration: 1000,
        //   timingFunc: 'easeIn'
        // }
      }),
      wx.setTabBarStyle({
        color: '#ffffff',
        // selectedColor: '#00FF00',
        backgroundColor: '#000000',
        borderStyle: 'white'
      })
    }else{
      wx.setNavigationBarColor({
        frontColor: '#000000', // 必写项【该字体颜色仅支持 #ffffff 和 #000000 】
        backgroundColor: '#ffffff', // 传递的颜色值【仅支持有效值为十六进制颜色】
      }),
      wx.setTabBarStyle({
        color: '#000000',
        // selectedColor: '#00FF00',
        backgroundColor: '#ffffff',
        borderStyle: 'white',
      })
    }
  },
});