// pages/geren/geren.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: '',
    openId:'',
    book_list_length: 10,
    user_book_list:[],
    list_flag:false,
    night_mode:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this
    this.setData({
      hasUserInfo: getApp().globalData.hasUserInfo,
      userInfo: getApp().globalData.userInfo,
      openId:getApp().globalData.openId,
    })
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: this.data.openId,
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data[0].booklist)
        var bookDataCache = res.data[0].booklist
        bookDataCache = bookDataCache.reverse()
        if (bookDataCache.length!=0) {
          that.setData({
            user_book_list: bookDataCache,
            list_flag:true,
          })
        }
      }
    })
  },

  // navToXiangxi: function (event) {
  //   var book_info = event.currentTarget.dataset.book_info
  //   book_info = JSON.stringify(book_info)
  //   book_info = book_info.replace(/\=/g,"@")
  //   console.log('传递数据:'+book_info);
  //   wx.navigateTo({
  //     url: '../xiangxi/xiangxi?book_info='+ book_info,
  //   })
  // },

  navToYuedu: function (event) {
    var book_name = event.currentTarget.dataset.book_name
    wx.navigateTo({
      url: '../yuedu/yuedu?book_name=' + book_name,
    })
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