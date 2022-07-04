import request from 'utils/request'

// 游戏列表
export const getList = (params?: any) => {
  return request({
    url: `/v1/gamelist`,
    method: 'get',
    params
  })
}
