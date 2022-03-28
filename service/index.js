const BASE_URL = "http://123.207.32.32:9001"

const LOGIN_BASE_URL = "http://123.207.32.32:3000"

class HYRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  request(url, method, params, header = {}) {
    return new Promise((reject, resolve) => {
      wx.request({
        url: this.baseUrl + url,
        method: method,
        data: params,
        header: header,
        success: function(res) {
          reject(res.data)
        },
        fail: function(err) {
          resolve(err)
        }
      })
    })
  }

  get(url, params, header) {
    return this.request(url, "GET", params, header)
  }

  post(url, data, header) {
    return this.request(url, "POST", data, header)
  }
}

const hyRequest = new HYRequest(BASE_URL);
const hyLoginRequest = new HYRequest(LOGIN_BASE_URL)

export default hyRequest;
export {
  hyLoginRequest
}