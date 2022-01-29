import https from 'https';

const prefix = 'https://api.juejin.cn/growth_api/v1/'

const headers = {
  "cookie": process.env.JUEJIN_COOKIE,
  "accept": "*/*",
  "accept-language": "zh-CN,zh;q=0.9",
  "content-type": "application/json",
  "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "Referer": "https://juejin.cn/",
  "Referrer-Policy": "strict-origin-when-cross-origin",
}

const request = async (options) => {
  const _options = {
    headers,
    hostname: 'api.juejin.cn',
    path: '/growth_api/v1/' + options.url || '',
    method: options.method || 'GET'
  }
  return new Promise((resolve, reject) => {
    const req = https.request(_options, (res) => {
      // console.log(res.statusCode)
      res.setEncoding('utf8')
      let data = ''
      res.on('data', d => {
        data += d
      })
      res.on('end', () => {
        // console.log(data)
        const info = JSON.parse(data)
        if (info.err_no === 0) {
          resolve({
            data: info.data,
            code: info.err_no
          })
        } else if (info.err_no === 403) {
          console.log('掘金登录已过期，请及时更新 cookie')
          resolve({
            code: 403,
            msg: '掘金登录已过期，请及时更新 cookie'
          })
        } else {
          resolve({
            code: info.err_no,
            msg: info.err_msg
          })
        }
      })
    })

    req.on('error', e => {
      console.error(e);
      resolve({
        code: -1,
        msg: e
      })
    })
    if (options.data) {
      req.write(options.data)
    }
    req.end()
  })
}

export default request