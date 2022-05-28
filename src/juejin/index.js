import {checkIn, getStatus, getCounts, getCurPoint, draw, dipLucky} from './service.js';
import wxPush from '../utils/wxPush.js'

async function getInfo() {
  const {code, data, msg} = await getCurPoint();
  const {code: code2, data: data2, msg: msg2} = await getCounts();
  const message = [];
  if (code === 0) {
      message.push(`当前矿石数: ${data}`);
  }
  if (code === 0) {
      message.push(`连续签到天数: ${data2.cont_count}`);
      message.push(`累计签到天数: ${data2.sum_count}\n`);
  }
  return message;
}

async function main() {
  const {code, data, msg} = await getStatus();
  if (code !== 0) {
    console.error(code, msg)
  }
  let message
  let errorMessge = []
  // 未签到
  if (!data) {
      // 签到
      console.log('开始签到')
      const {code, data, msg} = await checkIn();
      console.log(code, data, msg)
      message = await getInfo();
      if (code !== 0) {
        message.unshift(`签到失败，原因：${msg}`)
        errorMessge.unshift(`签到失败，原因：${msg}`)
      } else {
        message.unshift(`签到成功, 获得矿石：${data.incr_point}`)
      }

      // 抽奖
      console.log('开始抽奖')
      const res = await draw();
      if (res.code === 0) {
        message.splice(1, 0, `抽奖成功，获得：${res.data.lottery_name}`)
      } else {
        errorMessge.push(`抽奖失败，原因：${res.msg}`)
        message.splice(1, 0, `抽奖失败，原因：${res.msg}`)
      }
      console.log(res)

      // 沾喜气
      console.log('开始沾喜气')
      const res2 = await dipLucky();
      if (res2.code === 0) {
        message.splice(2, 0, `沾喜气成功，获得：${res2.data.dip_value}, 总值：${res2.data.total_value}`)
      } else {
        errorMessage.push(`沾喜气失败，原因：${res2.msg}`)
        message.splice(2, 0, `沾喜气失败，原因：${res2.msg}`)
      }
      console.log(res2)

      console.log(message);
  } else {
      message = await getInfo();
      message.unshift('您今日已完成签到，请勿重复签到！');
      errorMessage.unshift('您今日已完成签到，请勿重复签到！');
      console.log(message);
  }
  // console.log(await draw())
  // const res = await wxPush(message[0], message.join('\n\n'))
  if (errorMessage.length > 0) {
    const res = await wxPush('掘金脚本失败', errorMessage.join('\n\n'))
  }
  
  console.log(res)
}

main()

