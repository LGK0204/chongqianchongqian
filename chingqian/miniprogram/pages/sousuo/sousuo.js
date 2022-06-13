// pages/sousuo/sousuo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    searchData: '',
    result: [],
    flag: false,
    recentSearchTitle: [],
    recommendSearchTitle: [],
    night_mode:false,
  },

  showTextButton: function (event) {
    this.setData({
      isShow: true
    })
  },

  hiddenTextButton: function (event) {
    this.setData({
      isShow: false
    })
  },

  searchCancleButton: function (event) {
    this.setData({
      searchData: ''
    })
    wx.navigateBack({
      delta: 0,
    })
  },
  //数组去空值
  trimSpace(array) {
    for (var i = 0; i < array.length; i++) {
      //这里为过滤的值
      if (array[i] == " " || array[i] == null || typeof (array[i]) == "undefined" || array[i] == '  ') {
        array.splice(i, 1);
        i = i - 1;
      }
    }
    return array;
  },

  navToXiangxi_title(event) {
    var book_title = event.currentTarget.dataset.book_title
    var e = {
      detail: {
        value: book_title
      }
    }
    this.navToXiangxi(e)
  },

  navToXiangxi(event) {
    var that = this
    var book_info
    var bookName = event.detail.value
    wx.cloud.callFunction({
      // 云函数名称
      name: 'searchBook',
      // 传给云函数的参数
      data: {
        bname: bookName,
      },
      success: function (res) {
        var arr = that.trimSpace(res.result)
        if (arr.length == 1) {
          book_info = arr[0]
          book_info = JSON.stringify(book_info)
          book_info = book_info.replace(/\=/g, "@")
          console.log('传递数据:' + book_info);
          that.updateUserRecentSearchTitle(bookName)
          wx.navigateTo({
            url: '../xiangxi/xiangxi?book_info=' + book_info,
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '此书暂未收录！',
            showCancel: false,
          })
        }
      },
      fail: console.error
    })
  },

  recommendToXiangxi: function (event) {
    var book_info = event.currentTarget.dataset.book_info
    book_info = JSON.stringify(book_info)
    book_info = book_info.replace(/\=/g,"@")
    console.log('传递数据:'+book_info);
    wx.navigateTo({
      url: '../xiangxi/xiangxi?book_info='+ book_info,
    })
  },

  updateUserRecentSearchTitle(bookName) {
    const db = wx.cloud.database()
    const _ = db.command
    var openId = getApp().globalData.openId
    db.collection('user').where({
      _openid: openId,
    }).update({
      data: {
        recentSearchTitle: _.push(bookName)
      },
      success: function (res) {
        console.log(res);
      }
    })
  },

  getRecentSearchTitle() {
    var that = this
    const db = wx.cloud.database()
    var openId = getApp().globalData.openId
    db.collection('user').where({
      _openid: openId,
    }).get({
      success: function (res) {
        console.log(res.data[0].recentSearchTitle);
        that.setData({
          // 设置显示最近搜索的十本书
          recentSearchTitle: res.data[0].recentSearchTitle.slice(-10).reverse(),
          flag: true,
        })
      }
    })
  },

  getRecommendSearchTitle(){
    var that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'randomBookList',
      // 传给云函数的参数
      data: {

      },
      success: function (res) {
        that.setData({
          recommendSearchTitle:res.result,
        })
      },
      fail: console.error
    })
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
    this.getRecentSearchTitle()
    this.getRecommendSearchTitle()
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