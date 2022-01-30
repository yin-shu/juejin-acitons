import request from './request.js'

const PUSH_KEY = 'SCT116767TIeEM1TmkBuQrdkRphNcHsB9O'

const wxPush = async (title = '1', desp = '') => {
  const options = {
    hostname: 'sctapi.ftqq.com',
    path: `/${process.env.FANG_TANG_SEND_KEY}.send?title=${encodeURIComponent(title)}&desp=${encodeURIComponent(desp)}`
  }
  console.log(options)
  return await request(options)
}

export default wxPush
// wxPush()

