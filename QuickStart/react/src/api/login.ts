import request from 'utils/request'

// 游戏列表
export const getCode = (data: any) => {
  return request({
    url: `https://mgp-hello.sudden.ltd/login/v3`,
    method: 'post',
    data
  })
}
