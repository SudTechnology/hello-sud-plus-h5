import React from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import { useHome } from 'hooks/useHome'

const cx = classnames.bind(styles)

const Home = () => {
  const { list } = useHome()

  return (
    <div className={cx('container')}>
      {/* <div className={cx('title')}>Sud元宇宙互动升级</div> */}
      {/* 游戏列表 */}
      <div className={cx('game-list')}>
        {
          list.map((item: any) => {
            return (
              <a href={`/game/${item.mgId}?orientation=${item.orientation}`} key={item.mgId} className={cx('game-item')}>
                <img className={cx('game-logo')} src={item.scenePic} alt="" />
                <div className={cx('game-title')}>{item.gameName}</div>
              </a>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
