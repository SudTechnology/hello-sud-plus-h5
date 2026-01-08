import { requestUrlMap } from 'data/app'
import request from 'utils/request'

// 游戏列表
export const getCode = (data: any) => {
  const env = Number(localStorage.getItem('env')) || 3
  const baseUrl = requestUrlMap[env as keyof typeof requestUrlMap]
  return request({
    baseURL: baseUrl,
    url: `/login/v3`,
    method: 'post',
    data
  })
}
