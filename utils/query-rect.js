export default function(selector) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.select('.swiper-image').boundingClientRect()
    query.exec(resolve)
    // query.exec((res) => {
    //   resolve(res)
    // })
  })
}