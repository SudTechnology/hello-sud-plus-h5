import { lazy } from 'react'
import { RouteProp } from './index.d'
import 'antd/dist/antd.less'
// pc
const pcRoutes: RouteProp[] = [
  {
    path: '/',
    exact: true,
    title: '首页',
    loader: lazy(() => import('pc/Home'))
  },
  {
    path: '/game/:id',
    exact: true,
    title: '游戏详情',
    loader: lazy(() => import('pc/GameDetail'))
  }
]

export default pcRoutes
