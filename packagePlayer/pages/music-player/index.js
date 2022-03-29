// pages/music-player/index.js
import { audioContext, playerStore } from "../../../store/index";

const playModeNames = ["order", "repeat", "random"]

Page({
  data: {
    id: 0,
    currentSong: {},
    durationTime: 0, // 总的时长
    lyricInfos: [],  // 歌词数据,

    currentTime: 0,   // 当前播放到的时间
    currentLyricText: "",    // 当前显示的歌词
    currentLyricIndex: 0,   // 当前歌词播放的索引

    sliderValue: 0,
    lyricScrollTop: 0,

    contentHeight: 0,
    currentPage: 0,
    isSliderChanging: false, // 是否正在拖拽slider

    playModeIndex: 0,
    playModeName: "order",

    isPlaying: false,
    playingName: "pause"
  },

  onLoad: function (options) {
    const id = options.id;
    this.setData({ id });

    this.setupPlayerStoreListener()

    // 动态计算内容高度
    const globalData = getApp().globalData
    const contentHeight = globalData.screenHeight - globalData.statusBarHeight - globalData.navBarHeight;
    this.setData({ contentHeight });
  
  },

  // 监听playerStore 获取数据
  setupPlayerStoreListener: function() {
    // 1、监听currentSong、durationTime、lyricInfos
    playerStore.onStates(["currentSong", "durationTime", "lyricInfos"], ({ 
      currentSong, 
      durationTime, 
      lyricInfos
    }) => {
      if (currentSong) this.setData({ currentSong });
      if (durationTime) this.setData({ durationTime });
      if (lyricInfos) this.setData({ lyricInfos });
    })

    // 2、监听currentTime、currentLyricIndex、currentLyricText
    playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({ 
      currentTime, 
      currentLyricIndex, 
      currentLyricText 
    }) => {
      if (currentTime && !this.data.isSliderChanging) {
        const sliderValue = currentTime / this.data.durationTime * 100;
        this.setData({ currentTime, sliderValue })
      }

      if (currentLyricIndex) {
        this.setData({ currentLyricIndex, lyricScrollTop: currentLyricIndex * 35 - 150 })
      }

      if (currentLyricText) {
        this.setData({ currentLyricText })
      }
    })

    //3、监听播放模式相关的数据
    playerStore.onStates(["playModeIndex", "isPlaying"], ({ playModeIndex, isPlaying }) => {
      if (playModeIndex !== undefined) {
        this.setData({ playModeIndex, playModeName: playModeNames[playModeIndex] })
      }

      if(isPlaying !== undefined) {
        this.setData({ isPlaying, playingName: isPlaying ? "pause" : "resume" })
      }
    })
  },

  //事件处理
  handleSwiperChange(event) {
    this.setData({ currentPage: event.detail.current })
  },

  // 点击slider到某个具体的值
  handleSliderChange(event) {
    console.log(event)
    const sliderValue = event.detail.value;
    const currentTime = this.data.durationTime * sliderValue / 100;

    // 设置audioContext播放currentTime位置的歌曲
    audioContext.pause();
    audioContext.seek(currentTime / 1000)

    playerStore.setState("isPlaying", true);
    this.setData({ sliderValue, currentTime, isSliderChanging: false })
  },

  // 拖拽slider到某个值
  handleSliderChanging(event) {
    this.setData({ isSliderChanging: true })
  },

  // 切换播放模式
  handleModeBtnClick() {
    let playIndex = this.data.playModeIndex + 1;
    if (playIndex === 3) playIndex = 0;
    playerStore.setState("playModeIndex", playIndex)
  },

  // 播放、暂停
  handlePlayBtnClick() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },

  // 上一首
  handlePrevBtnClick() {
    playerStore.dispatch("changeNewMusicAction", false)
  },

  // 下一首
  handleNextBtnClick() {
    playerStore.dispatch("changeNewMusicAction", true)
  },

  // 返回上个页面
  handleNavbarBackClick() {
    wx.navigateBack();
  }

})