import https from 'https';

/**
 * request
 * @param {headers} headers 
 * @param {hostname, path, method, data} options 
 * @returns 
 */
const request = async (options, headers) => {
  const _options = {
    headers,
    hostname: options.hostname,
    path: options.path || '',
    method: options.method || 'GET'
  }
  return new Promise((resolve, reject) => {
    const req = https.request(_options, (res) => {
      console.log(res.statusCode)
      res.setEncoding('utf8')
      let data = ''
      res.on('data', d => {
        data += d
      })
      res.on('end', () => {
        console.log(_options)
        console.log(data)
        try {
          const info = JSON.parse(data)
          resolve(info)
        } catch(e) {
          resolve({})
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
