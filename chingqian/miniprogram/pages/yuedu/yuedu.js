// pages/yuedu/yuedu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_name: '',
    allcontent: '',
    readStart: 0,
    readStep: 90000,
    night_mode: false,
  },

  getBookText(book_name, readStart, readStep) {
    var data = this.data.allcontent
    wx.cloud.callFunction({
      name: 'readBook',
      data: {
        bookName: book_name,
        readStart: readStart,
        readStep: readStep,
      }
    }).then((resp) => {
      var result = resp.result
      data += result
      this.setData({
        allcontent: data,
        readStart: readStart + readStep,
      })
    }).catch((e) => {
      console.log(e);
      //  wx.hideLoading();
    });
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      book_name: options.book_name,
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
    this.getBookText(this.data.book_name, this.data.readStart, this.data.readStep)
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
    this.getBookText(this.data.book_name, this.data.readStart, this.data.readStep)
    // DownloadTask.onProgressUpdate(this.getBookText(this.data.book_name,this.data.readStart,this.data.readStep))
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})