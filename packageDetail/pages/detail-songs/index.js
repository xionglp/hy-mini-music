// pages/detail-songs/index.js
import { getSongMenuDetail } from "../../../service/api_music";
import { rankingStore, playerStore } from "../../../store/index"

Page({
  data: {
    type: "",
    rankingName: "",
    songInfo: {}

  },
  onLoad: function (options) {
    const type = options.type;
    this.setData({ type: type })

    if (this.data.type === "menu") { // 请求歌单详情
      const id = options.id;
      getSongMenuDetail(id).then(res => {
        console.log(res)
        this.setData({ songInfo: res.playlist })
      })
    } else if (this.data.type === "rank") { // 拿store中共享数据
      const rankingName = options.ranking;
      this.setData({ rankingName });
      rankingStore.onState(rankingName, this.getRankingDataHandle())
    }
  },

  onUnload: function () {
    if (this.data.rankingName) {
      rankingStore.offState(this.data.rankingName, this.getRankingDataHandle())
    }
  },

  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index;
    console.log(index)
    playerStore.setState("playListSong", this.data.songInfo.tracks)
    playerStore.setState("playListIndex", index)
  },

  getRankingDataHandle: function() {
    return (res) => {
      console.log(res)
      this.setData({ songInfo: res })
    }
  }

})