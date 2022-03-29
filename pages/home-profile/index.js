// pages/home-profile/index.js
import { getUserInfo } from "../../service/api_login"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {

  },

  async handleGetUserInfo(event) {
    const userInfo = await getUserInfo();
    console.log(userInfo)
  },

  handleGetPhoneNumber: async function(event) {
    console.log(event)
    // getPhoneNumber:fail no permission
  }

})