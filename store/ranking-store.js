import { HYEventStore } from "hy-event-store";
import { getRankings } from "../service/api_music";

const rankingMap = { 0: "newRankings", 1: "hotRankings", 2: "originRankings", 3: "upRankings" };

const rankingStore = new HYEventStore({
  state: {
    newRankings: {}, // 0 新歌
    hotRankings: {}, // 1 热门
    originRankings: {}, // 2 原创
    upRankings: {}, // 3 飙升
  },
  actions: {
    getRankingDataAction(ctx) {
      for(let i = 0; i < 4; i++) {
        getRankings(i).then(res => {
          switch (i) {
            case 0:
              ctx.newRankings = res.playlist
              break;
            case 1:
              ctx.hotRankings = res.playlist
              break;
            case 2:
              ctx.originRankings = res.playlist
              break;
            case 3:
              ctx.upRankings = res.playlist
              break;
          }
        })
      }
    }
  }
});

export {
  rankingStore,
  rankingMap
}