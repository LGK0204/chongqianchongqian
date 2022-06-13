// pages/fenlei/fenlei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_title: '',
    typeTitleText: ['玄幻奇幻', '武侠仙侠', '现代都市', '女频言情', '历史军事', '游戏竞技', '科幻灵异', '其他小说'],
    typeText: ['xuanhuan', 'xianxia', 'dushi', 'yanqing', 'lishi', 'youxi', 'kehuan', 'qita'],
    start:0,
    step:30,
    book_list: [],
    night_mode: false,
  },
  // 获取书籍列表
  // 每次读取30个，每次调用依次追加30 
  getBookList: function (table_name) {
    var name = table_name
    var that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getBookList',
      // 传给云函数的参数
      data: {
        table_name: name,
        start:that.data.start,
        step:that.data.step,
      },
      success: function (res) {
        var data = that.data.book_list
        res.result.data.forEach(function(e){  
          data.push(e)
        });
        console.log(data);
        that.setData({
          book_list: data
        })
      },
      fail: console.error
    })
    var new_start = this.data.start + 30
    this.setData({
      start:new_start
    })
  },

  // 图片加载失败处理
  imageError: function (params) {
    var i = this.data.book_list.length
    var data = this.data.book_list
    while(i--){
      if(data[i].bimg == params.target.dataset.img){
        console.log('图片加载错误:'+i);
        data[i].bimg = '../../images/logo.png'
      }
    }
    this.setData({
      book_list:data
    })
  },

  //获取值在数组中的下标
  getArrayIndex: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return i;
      }
    }
    return -1;
  },

  navToXiangxi: function (event) {
    var book_info = event.currentTarget.dataset.book_info
    book_info = JSON.stringify(book_info)
    book_info = book_info.replace(/\=/g,"@")
    console.log('传递数据:'+book_info);
    wx.navigateTo({
      url: '../xiangxi/xiangxi?book_info='+ book_info,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var table_name = this.data.typeText[this.getArrayIndex(this.data.typeTitleText,options.type)]
    this.getBookList(table_name)
    this.setData({
      type_title: options.type,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      night_mode: getApp().globalData.night_mode
    })
    let flag = this.data.night_mode
    getApp().changeModel(flag)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var table_name = this.data.typeText[this.getArrayIndex(this.data.typeTitleText,this.data.type_title)]
    this.getBookList(table_name)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})