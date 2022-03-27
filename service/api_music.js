import hyRequest from "./index";

// 获取轮播图数据
export function getBanners() {
  return hyRequest.get("/banner", {
    type: 2
  })
}

// 获取排行榜数据（新歌、热歌、原创、飙升）
export function getRankings(idx) {
  return hyRequest.get("/top/list", {
    idx
  })
}

// 获取歌单（热门歌单、推荐歌单）
export function getSongMenus(cat="全部", limit=6, offset=0) {
  return hyRequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}

// 获取歌单详情
export function getSongMenuDetail(id) {
  return hyRequest.get("/playlist/detail/dynamic", {
    id
  })
}