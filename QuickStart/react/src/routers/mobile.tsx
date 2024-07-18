import { RouteProp } from './index.d'
import Home from 'mobile/Home'
import GameDetail from 'mobile/GameDetail'
import GameDetailMb from 'mobile/GameDetailMb'

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
  },
  {
    path: '/gamedetail/:id',
    exact: true,
    title: '游戏详情',
    loader: GameDetailMb
  }

]

export default mobileRoutes
