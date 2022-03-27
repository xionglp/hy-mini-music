// components/music-song-menu/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认歌单"
    },
    songs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMenuMoreClick() {
      // wx.navigateTo({
      //   url: '/pages/detail-menus/index',
      // })
    },
    handleMenuItem(event) {
      const item = event.currentTarget.dataset.item;
      this.triggerEvent("menuItemClick", item)
    }
  }
})
