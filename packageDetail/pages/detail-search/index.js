// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest, getSearchResult } from "../../../service/api_serch";
import debounce from "../../../utils/debounce";
import stringToNodes from "../../../utils/richStringNode";

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300);

Page({
  data: {
    hotKeywords: [],
    searchValue: "",
    suggestSongs: [],
    suggestSongsNodes: [],
    resultSongs: []
  },

  onLoad: function (options) {
    this.getPageData()
  },

  onUnload: function () {

  },

  getPageData() {
    getSearchHot().then(res => {
      this.setData({ hotKeywords: res.result.hots });
    })
  },

  handleSuggestItemClick(event) {
    const searchValue = event.currentTarget.dataset.keyword;
    this.setData({ searchValue })
    this.handleGetSearchResultData()
  },

  // 请求搜索结果（歌曲）数据
  handleGetSearchResultData() {
    const searchValue = this.data.searchValue;
    getSearchResult(searchValue).then(res => {
      console.log(res);
      this.setData({ resultSongs: res.result.songs })
    })
  },

  handleSearchActive() {
    this.handleGetSearchResultData()
  },

  // 点击人们搜索关键字
  handleHotKeyword(event) {
    console.log(event);
    const keyword = event.currentTarget.dataset.keyword;
    this.setData({ searchValue: keyword });
    this.handleGetSearchResultData()
  },

  // 输入搜索关键字
  handleChangeSearch(event) {
    const searchValue = event.detail;
    this.setData({ searchValue });

    if (!searchValue.length) {
      this.setData({ suggestSongs: [] })
      this.setData({ resultSongs: [] })
      debounceGetSearchSuggest.cancel();
      return
    }

    debounceGetSearchSuggest(searchValue).then(res => {
      const suggestSongs = res.result.allMatch
      this.setData({ suggestSongs })

      // 转换nodes节点
      const suggestKeywords = suggestSongs.map(item => item.keyword);
      console.log(suggestKeywords)
      const suggestSongsNodes = []
      for (const keyword  of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchValue);
        suggestSongsNodes.push(nodes);
      }
      this.setData({ suggestSongsNodes });
    })
  }

})