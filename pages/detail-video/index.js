// pages/detail-video/index.js
import { getMVURL, getMVDetail, getRelatedVideo } from "../../service/api_video"

Page({
  data: {
    mvURLInfo: {},
    mvDetail: {},
    relaedVideos: []
  },

  onLoad: function (options) {
    const id = options.id
    this.getPageData(id);
  },

  getPageData(id) {
    // 获取播放地址
    getMVURL(id).then(res => {
      this.setData({ mvURLInfo: res.data });
    })

    // 请求视频信息
    getMVDetail(id).then(res => {
      this.setData({ mvDetail: res.data })
    })

    // 请求相关视频
    getRelatedVideo(id).then(res => {
      this.setData({ relaedVideos: res.data });
    })
  }
})