// import { lazy } from 'react'
import { lazy } from 'react'
import { RouteProp } from './index.d'

// 移动端路由
const mobileRoutes: RouteProp[] = [
  {
    path: '/',
    exact: true,
    title: '首页',
    loader: lazy(() => import('mobile/Home'))
  }

]

export default mobileRoutes
