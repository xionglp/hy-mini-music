// pages/home-music/index.js
import { getBanners, getSongMenus }  from "../../service/api_music";
import queryRect from "../../utils/query-rect";
import throttle from "../../utils/throttle";
import { rankingStore, rankingMap, playerStore } from "../../store/index";

const throttleQueryRect = throttle(queryRect, 1000, { trailing: true });

Page({
  data: {
    swiperHeight: 0,
    banners: [],
    recommendSongs: [], // 推荐歌曲
    hotMenus: [], // 热门歌单
    recommendMenus: [], // 推荐歌单
    rankings: { 0: {}, 2: {}, 3: {} }, // 巅峰榜数据

    currentSong: {},
    isPlaying: false,
    playAnimState: "paused",
  },
  onLoad: function (options) {

    // playerStore.dispatch("playMusicWithSongIdAction", { id: 1891469546 })
    
    this.getPageData();

    // 发起共享数据的请求
    rankingStore.dispatch("getRankingDataAction");

    // 从store中获取共享数据
    this.setupPlayerStoreListener();
  },
  
  setupPlayerStoreListener() {
    // 取出hotRankings数据 对应显示在推荐歌曲中
    rankingStore.onState("hotRankings", (res) => {
      if (!res.tracks) return;
      const recommendSongs = res.tracks.slice(0, 6);
      this.setData({ recommendSongs })
    })

    // store中取出巅峰榜数据
    rankingStore.onState("newRankings", this.getHandleRankingsData(0));
    rankingStore.onState("originRankings", this.getHandleRankingsData(2));
    rankingStore.onState("upRankings", this.getHandleRankingsData(3));

    playerStore.onStates(["currentSong", "isPlaying"], ({ currentSong, isPlaying }) => {
      if (currentSong) this.setData({ currentSong })
      if (isPlaying !== undefined) {
        this.setData({ isPlaying, playAnimState: isPlaying ? "running" : "paused" })
      }
    })
  },

  getPageData: function() {
    getBanners().then(res => {
      this.setData({banners: res.banners})
    })

    getSongMenus().then(res => {
      this.setData({ hotMenus: res.playlists })
    })

    getSongMenus("华语").then(res => {
      this.setData({recommendMenus: res.playlists});
    })
  },

  getHandleRankingsData: function(idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return;
      const name = res.name;
      const songlist = res.tracks.slice(0, 3);
      const coverImgUrl = res.coverImgUrl;
      const playCount = res.playCount;
      const rankingObj = { name, songlist, coverImgUrl, playCount };
      const newRankings = { ...this.data.rankings, [idx]: rankingObj };
      this.setData({rankings: newRankings})
    }
  },

  handleSwiperImageLoaded() {
    // 图片加载完之后，动态计算图片控件组件的高度
    throttleQueryRect(".swiper-image").then(res => {
      const rect = res[0]
      this.setData({swiperHeight: rect.height})
    })
  },

  handleRecommendMoreClick() {
    this.navigateToDetailSongsPage("hotRankings")
  },

  // 巅峰榜
  handleRankingMoreClick(event) {
    const idx = event.currentTarget.dataset.id
    const rankingName = rankingMap[idx];
    this.navigateToDetailSongsPage(rankingName);
  },

  handleSongItemClick: function(event) {
    const index = event.currentTarget.dataset.index;
    playerStore.setState("playListSong", this.data.recommendSongs)
    playerStore.setState("playListIndex", index);
  },

  // 播放、暂停
  handlePlayBtnClick() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying);
  },

  handlePlayBarClick() {
    wx.navigateTo({
      url: '/pages/music-player/index?id=' + this.data.currentSong.id,
    })
  },

  // 歌单item
  handleMenuItemClick(event) {
    console.log(event)
    wx.navigateTo({
      url: `/pages/detail-songs/index?type=menu&id=${event.detail.id}`,
    })
  },

  navigateToDetailSongsPage(rankingName) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?type=rank&ranking=${rankingName}`,
    })
  },

  handleSearchClick: function() {
    wx.navigateTo({
      url: '../detail-search/index',
    })
  }
})