import hyRequest from "./index";

/**
 * 根据歌曲id查询歌曲详情
 * @param {歌曲id} ids 
 */
export function getSongDetail(ids) {
  return hyRequest.get("/song/detail", {
    ids
  })
}

/**
 * 根据歌曲id查询歌词
 * @param {歌曲的id} id 
 */
export function getSongLyric(id) {
  return hyRequest.get("/lyric", {
    id
  })
}