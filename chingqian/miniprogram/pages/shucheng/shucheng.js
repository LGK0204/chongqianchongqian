// pages/shucheng/shucheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemIndex: 0,
    tab: 0,
    topNoColor: ['#ff2121', '#fa8c35', '#ffc64b', 'black', 'black', 'black', 'black', 'black'],
    typeTitleText: ['玄幻奇幻', '武侠仙侠', '现代都市', '女频言情', '历史军事', '游戏竞技', '科幻灵异', '其他小说'],
    typeTitleColor: ['#037ef3', '#f85a40', '#00c16e', '#7552cc', '#0cb9c1', '#f48924', '#ffc845', '#52565e'],
    // contrastColor: ['#fffbf0', '#fff'],
    recommend_book_list: [],
    day_top_list:[],
    week_top_list:[],
    month_top_list:[],
    night_mode:false,
  },


  navToSousuo: function (event) {
    wx.navigateTo({
      url: '../sousuo/sousuo',
    })
  },

  navToFenlei: function (event) {
    var type = event.target.dataset.type
    wx.navigateTo({
      url: '../fenlei/fenlei?type='+type,
    })
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

  changeSwiperItem: function (event) {
    this.setData({
      itemIndex: event.target.dataset.itemIndex
    })
  },

  changeTab: function (event) {
    this.setData({
      tab: event.detail.current
    })
  },

  getTopList: function (table_name) {
    const db = wx.cloud.database({
      env: 'cloud1-0g969ggs31e658ac'
    })
    var that = this
    // const top_list = db.collection('day_top')
    db.collection(table_name).get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        // console.log(res.data)
        if(table_name == "day_top"){
          that.setData({
            day_top_list:res.data
          })
        }else if(table_name == "week_top"){
          that.setData({
            week_top_list:res.data
          })
        }else if(table_name == "month_top"){
          that.setData({
            month_top_list:res.data
          })
        }
      }
    })
  },

  getRandomBookList(){
    var that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'randomBookList',
      // 传给云函数的参数
      data: {

      },
      success: function (res) {
        that.setData({
          recommend_book_list:res.result,
        })
      },
      fail: console.error
    })
  },

  navToYuedu: function (event) {
    var book_name = event.currentTarget.dataset.recommend_book_name
    wx.navigateTo({
      url: '../yuedu/yuedu?book_name=' + book_name,
    })
    var bookInfo = event.currentTarget.dataset.book_info
    var openId = getApp().globalData.openId
    wx.cloud.callFunction({
      name: 'updateUserInfo',
      data: {
        openId: openId,
        bookInfo: bookInfo,
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRandomBookList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTopList('day_top')
    this.getTopList('week_top')
    this.getTopList('month_top')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      night_mode:getApp().globalData.night_mode
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
    this.getRandomBookList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})