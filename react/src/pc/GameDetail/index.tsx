import React, { useEffect } from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import Close from 'assets/close.png'
import { useGameDetail } from 'hooks/useGameDetail'
const cx = classnames.bind(styles)

const GameDetail = () => {
  const { initGame } = useGameDetail()
  useEffect(() => {
    initGame()
  }, [])

  return (
    <div className={cx('container')}>
      {/* game 容器 */}
      <img src={Close} alt="" className={cx('close')} />
      <div id='game' className={cx('game-wrap')}></div>
    </div>
  )
}

export default GameDetail
