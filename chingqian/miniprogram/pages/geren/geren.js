// pages/geren/geren.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false,
    showUploadTip: false,
    haveGetOpenId: false,
    newUserFlag: true,
    userInfo: '',
    hasUserInfo: false,
    openId: '',
    lv: 0,
    lv_title: 0,
    lv_info: 0,
    lastLoginTime: '',
    nowLoginTime: '',
    night_mode:false,
  },

  getUserProfile(e) {
    wx.showLoading({
      title: '登录中',
    });
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        getApp().globalData.userInfo = res.userInfo;
        getApp().globalData.hasUserInfo = true;
        this.getOpenId()
      },
      complete(){
        wx.hideLoading();
      }
    });
  },

  // 获取用户信息
  getUserInfo(openId) {
    const db = wx.cloud.database()
    var that = this
    db.collection('user').where({
      _openid: openId,
    }).get({
      success: function (res) {
        that.setData({
          lastLoginTime: res.data[0].lastLoginTime
        })
        var lvCache = parseInt(res.data[0].lv) + 10
        var timeCache = getApp().processDate(new Date())
        db.collection('user').where({
          _openid: that.data.openId,
        }).update({
          data: {
            lastLoginTime: timeCache,
            lv: lvCache,
            // booklist: [],
          },
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            that.setData({
              lv: lvCache,
              nowLoginTime: timeCache
            })
            that.setLvInfo()
          }
        })
      }
    })
  },

  getOpenId() {
    wx.cloud.callFunction({
      name: 'getOpenId',
      data: {

      }
    }).then((resp) => {
      this.setData({
        haveGetOpenId: true,
        openId: resp.result.openid
      });
      this.addUserInfo(this.data.openId)
      this.getUserInfo(this.data.openId)
      getApp().globalData.openId = resp.result.openid;
      getApp().globalData.haveGetOpenId = true;
      //  wx.hideLoading();
    }).catch((e) => {
      this.setData({
        showUploadTip: true
      });
      //  wx.hideLoading();
    });
  },

  addUserInfo(openId) {
    //插入数据
    var that = this
    const db = wx.cloud.database()
    db.collection('user').where({
        _openid: openId,
        // _openid: 'olkCP4mzQvX41kOHCJ95eAH550XI'
      })
      .get({
        success: function (res) {
          // res.data 是包含以上定义记录的数组
          var timeCache = getApp().processDate(new Date())
          if (res.data.length == 0) {
            db.collection('user').add({
              data: {
                lastLoginTime: timeCache,
                lv: 110,
                booklist: [],
              },
              success: function (res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
              }
            })
            that.setData({
              nowLoginTime:timeCache,
              lv:110,
            })
            that.setLvInfo()
            console.log('新用户数据添加!');
          } else {
            console.log("用户已存在!");
          }
        },
      })
  },

  setLvInfo() {
    var titleCache = parseInt(this.data.lv / 100)
    var infoCache = this.data.lv % 100
    this.setData({
      lv_title:titleCache,
      lv_info:infoCache,
    })
  },

  changeNightMode(event){
    console.log(event.detail.value);
    getApp().globalData.night_mode = event.detail.value;
    this.setData({
      night_mode:getApp().globalData.night_mode
    })
    let flag = this.data.night_mode
    getApp().changeModel(flag)
  },



  // clearOpenId() {
  //   this.setData({
  //     haveGetOpenId: false,
  //     openId: ''
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.setData({
      night_mode:getApp().globalData.night_mode
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})