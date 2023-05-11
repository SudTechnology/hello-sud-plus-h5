import { RouteProp } from './index.d'
import Home from 'pc/Home'
import GameDetail from 'pc/GameDetail'
// pc
const pcRoutes: RouteProp[] = [
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

export default pcRoutes
