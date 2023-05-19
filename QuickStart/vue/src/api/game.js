import request from '@/utils/request'

// 游戏列表
export const getList = (params) => {
  return request({
    url: '/v1/gamelist',
    method: 'get',
    params
  })
}

export const getGameList = (params) => {
  return request({
    url: '/game/list/v1',
    method: 'post',
    params
  })
}
