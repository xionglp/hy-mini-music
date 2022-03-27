import { HYEventStore } from "hy-event-store";
import { getSongDetail, getSongLyric }  from "../service/api_player";
import { parseLyric } from "../utils/parse-lyric";

const  audioContext = wx.createInnerAudioContext() 

const playerStore = new HYEventStore({
  state: {
    id: 0,
    currentSong: {},
    durationTime: 0, // 总的时长
    lyricInfos: [],  // 歌词数据,

    currentTime: 0,          // 当前播放到的时间
    currentLyricIndex: 0,   // 当前歌词播放的索引
    currentLyricText: "",    // 当前显示的歌词

    playModeIndex: 0,      // 0 循环播放， 1 单曲播放， 2随机播放
    isPlaying: false,      // 当前播放的状态
    playListSong: [],   // 播放列表
    playListIndex: 0,// 当前播放的索引

  },
  actions: {
    playMusicWithSongIdAction(ctx, { id, isRefresh = false }) {
      if (ctx.id === id && !isRefresh) {
        this.dispatch("changeMusicPlayStatusAction", true)
        return;
      }

      ctx.id = id;
      // 设置为播放状态
      ctx.isPlaying = true;

      // 0、清空之前的数据
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ""

      // 1、根据id请求对应的歌曲和歌词数据
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0];
        ctx.durationTime = res.songs[0].dt;
      })
  
      getSongLyric(id).then(res => {
        const lyricString = res.lrc.lyric;
        const lyrics = parseLyric(lyricString)
        ctx.lyricInfos = lyrics;
      })

      // 2、使用audioContext播放歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true;

      //3、监听audioContext事件
      this.dispatch("setupAudioContextListenerAction")
    },

    // 监听播放器时间的变更
    setupAudioContextListenerAction(ctx) {
      audioContext.onCanplay(() => {
        audioContext.play()
      })

      // 监听时间变化
      audioContext.onTimeUpdate(() => {
        const currentTime = audioContext.currentTime * 1000; // 毫秒数
        ctx.currentTime = currentTime;

        for (let i = 1; i < ctx.lyricInfos.length; i++) {
          const lyric = ctx.lyricInfos[i];
          if (currentTime < lyric.time) {
            // 设置当前歌词和索引
            const currentIndex = i - 1;
            if (ctx.currentLyricIndex !== currentIndex) {
              const currentLyric = ctx.lyricInfos[currentIndex];
              ctx.currentLyricIndex = currentIndex;
              ctx.currentLyricText = currentLyric.text;
            }
            break;
          }
        }
      });

      // 监听播放完成，自动播放下一首歌曲
      audioContext.onEnded(() => {
        this.dispatch("changeNewMusicAction");
      });
    },

    // 改变播放状态的action
    changeMusicPlayStatusAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying;
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    },

    // 上一首、下一首监听
    changeNewMusicAction(ctx, isNext = true) {
      let index = ctx.playListIndex;

      // 根据不同的播放模式， 获取切换下一首的索引
      switch (ctx.playModeIndex) {
        case 0: // 顺序播放
          index = isNext ? index + 1 : index - 1;
          if (index === -1) index = ctx.playListSong.length - 1;
          if (index === ctx.playListSong.length) index = 0
          break;
        case 1: // 单曲播放
          // index  = index;
          break;
        case 2: // 随机播放
          index = Math.floor(Math.random() * ctx.playListSong.length);
          break;
      }

      console.log(index)

      // 获取歌曲
      let currentSong = ctx.playListSong[index];
      if (!currentSong) {
        currentSong = ctx.currentSong;
      } else {
        ctx.playListIndex = index;
      }

      // 播放歌曲
      this.dispatch("playMusicWithSongIdAction", { id: currentSong.id, isRefresh: true })
    }
  }
})

export {
  audioContext,
  playerStore
}