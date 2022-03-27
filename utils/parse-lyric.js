const timeRegExp = /\[(\d{2}):(\d{2}).(\d{2,3})\]/

export function parseLyric(lyricString) {
 // [00:58.65]他们说 要缝好你的伤 没有人爱小丑
 const lyricStrings = lyricString.split("\n");
 const lyricInfos = []
 for (const lineLyric of lyricStrings) {
   const resultTime = timeRegExp.exec(lineLyric);
   if (!resultTime) continue;

   // 获取时间毫秒数
   const minute = resultTime[1] * 60 * 1000
   const second = resultTime[2] * 1000
   const millSecond = resultTime[3].length === 2 ? resultTime[3] * 10 : resultTime[3] * 1
   const time = minute + second + millSecond

   const text = lineLyric.replace(resultTime[0], "")
   lyricInfos.push({ time, text })
 }
  return lyricInfos
}