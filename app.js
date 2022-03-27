// app.js
App({
  onLaunch() {
    const sysInfo = wx.getSystemInfoSync();
    // console.log(sysInfo)
    this.globalData.screenWidth = sysInfo.screenWidth;
    this.globalData.screenHeight = sysInfo.screenHeight;
    this.globalData.statusBarHeight = sysInfo.statusBarHeight;
    const ratio = sysInfo.screenHeight / sysInfo.screenWidth;
    this.globalData.deviceRatio = ratio;
  },

  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0, // 状态栏高度
    navBarHeight: 44,    //导航栏的高度
    deviceRatio: 0,     // 设备宽高比
  }
})
