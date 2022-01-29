import https from 'https';

const prefix = 'https://api.juejin.cn/growth_api/v1/'

const headers = {
  "cookie": '_ga=GA1.2.1605872288.1615694306; MONITOR_WEB_ID=b6ced9a9-0c83-40af-b5e6-ac9c1eb49a02; n_mh=Z8trEpz5tR0PgwJiwmE60OV8R9sDISMu6h2REqUMBUE; passport_csrf_token_default=b0a21287e749182e0b5b441854856561; passport_csrf_token=b0a21287e749182e0b5b441854856561; sid_guard=d6188036c1b5b4c18cd4980fb934826f%7C1641262828%7C5184000%7CSat%2C+05-Mar-2022+02%3A20%3A28+GMT; uid_tt=a35fae5e9e3f4d05576e513dfe22726c; uid_tt_ss=a35fae5e9e3f4d05576e513dfe22726c; sid_tt=d6188036c1b5b4c18cd4980fb934826f; sessionid=d6188036c1b5b4c18cd4980fb934826f; sessionid_ss=d6188036c1b5b4c18cd4980fb934826f; sid_ucp_v1=1.0.0-KGE0YjA3NTZhZjc4MTk3NjFkMmQ2NWU3YmExYTk4MzNkMTY3YTU3ZDUKFgiu9YC__fWhAxDs3c6OBhiwFDgIQAsaAmxmIiBkNjE4ODAzNmMxYjViNGMxOGNkNDk4MGZiOTM0ODI2Zg; ssid_ucp_v1=1.0.0-KGE0YjA3NTZhZjc4MTk3NjFkMmQ2NWU3YmExYTk4MzNkMTY3YTU3ZDUKFgiu9YC__fWhAxDs3c6OBhiwFDgIQAsaAmxmIiBkNjE4ODAzNmMxYjViNGMxOGNkNDk4MGZiOTM0ODI2Zg; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25226947852186353616415%2522%252C%2522web_id%2522%253A%25226947852186353616415%2522%252C%2522timestamp%2522%253A1641865045786%257D; _tea_utm_cache_2608={%22utm_source%22:%22gold_browser_extension%22}; _gid=GA1.2.1122533450.1643104989',
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