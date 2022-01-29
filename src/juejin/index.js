import {checkIn, getStatus, getCounts, getCurPoint, draw, dipLucky} from './service.js';

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
  // 未签到
  if (!data) {
      // 签到
      console.log('开始签到')
      const {code, data, msg} = await checkIn();
      console.log(code, data, msg)
      const message = await getInfo();
      if (code !== 0) {
        message.unshift(`签到失败，原因：${msg}`)
      }
      message.unshift(`签到成功, 获得矿石：${incr_point}`)

      // 抽奖
      console.log('开始签到')
      const res = await draw();
      if (res.code === 0) {
        message.splice(1, 0, `抽奖成功，获得：${res.data.lottery_name}`)
      }
      console.log(res)

      // 沾喜气
      console.log('开始沾喜气')
      const res2 = await dipLucky();
      if (res2.code === 0) {
        message.splice(2, 0, `沾喜气成功，获得：${res2.data.dip_value}, 总值：${res2.data.total_value}`)
      }
      console.log(res2)

      console.log(message);
  } else {
      const message = await getInfo();
      message.unshift('您今日已完成签到，请勿重复签到！');
      console.log(message);
  }

}

main()