// baseui/nav-bar/index.js
Component({
  properties: {
    title: {
      type: String,
      value: "默认标题"
    }
  },

  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    navBarHeight: getApp().globalData.navBarHeight
  },
  
  methods: {
    handleleftBtnClick() {
      this.triggerEvent("click")
    }
  }
})
