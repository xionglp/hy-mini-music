import hyRequest from "./index";

/**
 * 获取顶部视频数据
 * @param {object} params 
 */
export function getTopMovies(params) {
  return hyRequest.get("/top/mv", params)
}

/**
 * 请求MV的播放地址
 * @param {number} id MV的id 
 */
export function getMVURL(id) {
  return hyRequest.get("/mv/url", {
    id
  })
}

/**
 * 请求MV的详情
 * @param {number} mvid MV的id
 */
export function getMVDetail(mvid) {
  return hyRequest.get("/mv/detail", {
    mvid
  })
}

/**
 * 查询所有相关的视频
 * @param {number} id MV的id
 */
export function getRelatedVideo(id) {
  return hyRequest.get("/related/allVideo", {
    id
  })
}