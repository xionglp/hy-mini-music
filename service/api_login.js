import { hyLoginRequest } from "./index";

export function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success: (res) => {
        const code = res.code;
        resolve(code);
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 将code通过服务器换取token
 * @param {*} code 
 */
export function codeToToken(code) {
  return hyLoginRequest.post("/login", { code })
}

export function checkToken(token) {
  return hyLoginRequest.post("/auth", {}, { token })
}

/**
 * 检查session有效期
 */
export function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: (res) => {
        resolve(true)
      },
      fail: () => {
        reject(false)
      }
    })
  })
}