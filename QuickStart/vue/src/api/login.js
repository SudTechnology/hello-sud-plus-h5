import request from '@/utils/request'

// 游戏列表
export const getCode = (data) => {
  return request({
    url: 'https://prod-hellosud-base.s00.tech/login/v3', // 业务方自行实现该接口
    method: 'post',
    data
  })
}
