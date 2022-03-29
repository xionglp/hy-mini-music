// components/music-song-ranking/index.js
import { playerStore }  from "../../store/index"

Component({
  properties: {
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
        url: '/packagePlayer/pages/music-player/index?id=' + id,
      })
    }
  }
})
