import request from './request.js'

/**
 * 获取签到状态
 */
export const getStatus = async function() {
  return await request({
    url: 'v2/get_today_status'
  })
}

/**
 * 抽奖
 */
export const draw = async function() {
  return await request({
    url: 'v1/lottery/draw',
    method: 'post'
  })
}

/**
 * 签到
 */
 export const checkIn = async function() {
  return await request({
    url: 'v1/check_in',
    method: 'post'
  })
}

/**
 * 获取连续签到天数、累计签到天数
 */
 export const getCounts = async function() {
  return await request({
    url: 'v1/get_counts'
  })
}

/**
 * 获取当前积分
 */
 export const getCurPoint = async function() {
  return await request({
    url: 'v1/get_cur_point'
  })
}

/**
 * 沾喜气
 */
 export const dipLucky = async function() {
  const data = JSON.stringify({
    lottery_history_id: '7057551468475187203'
  })
  return await request({
    url: 'v1/lottery_lucky/dip_lucky?aid=2608&uuid=6947852186353616415',
    method: 'post',
    data: data
  })
}

// getStatus()
// draw()
// checkIn()
// getCounts()
// getCurPoint()
