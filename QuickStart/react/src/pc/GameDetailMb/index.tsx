import React from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'

import { useGameDetail } from 'hooks/useGameDetail'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { getQueryParam } from 'utils'

const cx = classnames.bind(styles)

const GameDetail = (props: RouteComponentProps) => {
  console.log(props)
  const params: { id?: string } = props.match.params
  console.log(params)
  const roomId = getQueryParam('roomId')
  const userId = getQueryParam('userId')
  const language = getQueryParam('language')
  useGameDetail(params.id || '', roomId || (params.id || ''), language || 'zh-CN', userId)

  return (
    <div className={cx('container')}>
      <div className={cx('game-container')}>
        {/* game 容器 */}
        <div id='game' className={cx('game-wrap')}></div>
      </div>
    </div>
  )
}

export default withRouter(GameDetail)
