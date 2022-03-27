// pages/home-video/index.js
import { getTopMovies } from "../../service/api_video";

Page({
  data: {
    topMovies: [],
    hasMore: true,
  },

  // async await
  onLoad: async function () {
    // 异步函数用同步的方式去写
    this.getTopMvData(0)
  },

  getTopMvData: async function(offset) {
    if(!this.data.hasMore) return
    const res = await getTopMovies({offset: offset, limit: 10})
    var newData = this.data.topMovies;
    if (offset === 0) {
      newData = res.data
    } else {
      newData = newData.concat(res.data)
    }
    this.setData({topMovies: newData})
    this.setData({hasMore: res.hasMore})
    if (offset === 0) wx.stopPullDownRefresh();
  },

  handleVideoItemClick(event) {
    var video = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${video.id}`,
    })
  },

  // 下拉刷新
  onPullDownRefresh: async function() {
    this.getTopMvData(0)
  },

  // 上拉加载更多
  onReachBottom: async function() {
    this.getTopMvData(this.data.topMovies.length)
  },

  test: function() {
    // 获取顶部视频数据
    // getTopMovies({offset: 0, limit: 20}).then(res => {
    //   this.setData({ topMovies: res.data })
    // })
  }
})