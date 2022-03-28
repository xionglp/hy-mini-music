// app.js
import { getLoginCode, codeToToken, checkToken, checkSession } from "./service/api_login";
import { TOKEN_KEY } from "./constant/login-const"

App({

  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0, // 状态栏高度
    navBarHeight: 44,    //导航栏的高度
    deviceRatio: 0,     // 设备宽高比
  },

  async onLaunch() {
    const sysInfo = wx.getSystemInfoSync();
    // console.log(sysInfo)
    this.globalData.screenWidth = sysInfo.screenWidth;
    this.globalData.screenHeight = sysInfo.screenHeight;
    this.globalData.statusBarHeight = sysInfo.statusBarHeight;
    const ratio = sysInfo.screenHeight / sysInfo.screenWidth;
    this.globalData.deviceRatio = ratio;

    
    this.checkLoginAndLogin()
  },

  checkLoginAndLogin: async function() {
    // 判断用户要不要登录， 检查本地有没有token， 检查token有效期，检查session是否过期
    const token = wx.getStorageSync(TOKEN_KEY);
    const checkResult = await checkToken(token);
    const isSessionExpire = await checkSession();

    if (!token || checkResult.errorCode || !isSessionExpire) {
      this.loginAction()
    }
  },

  loginAction: async function() {
    // 获取code
    const code = await getLoginCode();
    // 获取token
    const results = await codeToToken(code);
    console.log(results);
    wx.setStorageSync(TOKEN_KEY, results.token);
  }
  
})
