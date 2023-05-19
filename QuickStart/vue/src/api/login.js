import request from '@/utils/request'

// 游戏列表
export const getCode = (data) => {
  return request({
    url: 'https://mgp-hello.sudden.ltd/login/v3', // 业务方自行实现该接口
    method: 'post',
    data
  })
}
