import request from 'utils/request'

// 游戏列表
export const getList = (params?: any) => {
  return request({
    url: `https://fat-sud-static-v.sudden.ltd/game/web_home_game.json`,
    withCredentials: false,
    method: 'get'
  })
}

export const getGameList = () => {
  return request({
    url: `https://fat-sud-static-v.sudden.ltd/game/web_home_game.json`,
    // url: `/game/list/v1`,
    method: 'get'
  })
}
