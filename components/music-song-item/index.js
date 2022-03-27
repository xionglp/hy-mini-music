// components/music-song-item/index.js
import { playerStore } from "../../store/index"

Component({
  properties: {
    index: {
      type: Number,
      value: 0
    },
    item: {
      type: Object,
      value: {}
    }
  },

  data: {

  },

  methods: {
    handleItemClick(event) {
      const id = event.currentTarget.dataset.item.id;
      playerStore.dispatch("playMusicWithSongIdAction", { id });
      wx.navigateTo({
        url: '/pages/music-player/index?id=' + id,
      })
    }
  }
})
