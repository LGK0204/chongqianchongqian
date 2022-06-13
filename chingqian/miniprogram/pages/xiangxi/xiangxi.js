// pages/xiangxi/xiangxi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_info: {},
    night_mode: false,
  },

  navToYuedu: function (event) {
    var book_name = this.data.book_info.bname
    wx.navigateTo({
      url: '../yuedu/yuedu?book_name=' + book_name,
    })
    var bookInfo = this.data.book_info
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
    options.book_info = options.book_info.replace(/\@/g, '=')
    console.log('接收数据:' + options.book_info);
    var data = JSON.parse(options.book_info);
    this.setData({
      book_info: data,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})