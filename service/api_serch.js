import hyRequest  from "./index"

/**
 * 查询热门搜索
 */
export function getSearchHot() {
  return hyRequest.get("/search/hot")
}

/**
 * 根据关键字查询建议结果
 * @param {关键字} keywords 
 */
export function getSearchSuggest(keywords) {
  return hyRequest.get("/search/suggest", {
    keywords,
    type: "mobile"
  })
}

/**
 * 根据搜索关键字查询歌曲
 * @param {搜索关键字} keywords 
 */
export function getSearchResult(keywords) {
  return hyRequest.get("/search", {
    keywords
  })
}