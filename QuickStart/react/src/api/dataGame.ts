import request from 'utils/request'
import { requestUrlMap } from 'data/app'

/* eslint-disable camelcase -- 接口字段与服务端协议保持一致 */
interface GetAccountParams {
  user_id: string
  app_id: string
}

interface GetAccountResponse {
  ret_code: number
  ret_msg: string
  data?: {
    coin: number
  }
}

interface CreateOrderParams {
  user_id: string
  app_id: string
  from_uid: string
  to_uid: string
  /** 游戏 ID。必须保持字符串：数值游戏的 mg_id 超过 Number.MAX_SAFE_INTEGER，转数字会丢精度 */
  mg_id: string
  room_id: string
  /** 触发的行为动作，比如 add_score(带入积分)、buy_props(购买道具) */
  cmd: string
  value: number
  /** 扩展数据，JSON 字符串 */
  payload: string
}

interface CreateOrderResponse {
  ret_code: number
  ret_msg: string
}
/* eslint-enable camelcase */

// 数值游戏接口的 DEV、FAT 环境使用对应的 CP 服务。
const getCpBaseUrl = () => {
  const env = Number(localStorage.getItem('env')) || 3
  const accountEnv = env === 4 ? 5 : env === 3 ? 6 : env
  return requestUrlMap[accountEnv as keyof typeof requestUrlMap]
}

// 查询用户积分余额
export const getAccount = (data: GetAccountParams) => {
  // request 的响应拦截器直接返回响应体。
  return request({
    baseURL: getCpBaseUrl(),
    url: '/get-account/v1',
    method: 'post',
    data
  }) as unknown as Promise<GetAccountResponse>
}

// 创建订单（带入积分 / 游戏内购买），对应安卓 CustomGameActivity 的两处 create-order 调用
export const createOrder = (data: CreateOrderParams) => {
  return request({
    baseURL: getCpBaseUrl(),
    url: '/create-order/v1',
    method: 'post',
    data
  }) as unknown as Promise<CreateOrderResponse>
}

// 获取短期令牌 code（服务端同时会创建账户，因此必须先于 get-account 调用）
export const getCode = (data: any) => {
  return request({
    baseURL: getCpBaseUrl(),
    url: `/login/v1`,
    method: 'post',
    data
  })
}

export type { CreateOrderParams }
