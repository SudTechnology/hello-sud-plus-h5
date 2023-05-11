import { RouteProp } from './index.d'
import Home from 'mobile/Home'
import GameDetail from 'mobile/GameDetail'

// 移动端路由
const mobileRoutes: RouteProp[] = [
  {
    path: '/',
    exact: true,
    title: '首页',
    loader: Home
  },
  {
    path: '/game/:id',
    exact: true,
    title: '游戏详情',
    loader: GameDetail
  }

]

export default mobileRoutes
