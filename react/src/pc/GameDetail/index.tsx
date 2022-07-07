import React from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import Close from 'assets/close.png'
import { Modal } from 'antd'
import { useGameDetail } from 'hooks/useGameDetail'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const cx = classnames.bind(styles)

const GameDetail = (props: RouteComponentProps) => {
  console.log(props)
  const params: { id?: string } = props.match.params
  console.log(params)
  const { SudSDk } = useGameDetail(params.id || '')

  const destory = () => {
    Modal.confirm({
      centered: true,
      width: 400,
      bodyStyle: {
        textAlign: 'center'
      },
      okType: 'ghost',
      className: 'quit-game',
      title: '',
      content: '确定要退出吗？',
      okText: '确认',
      cancelText: '取消',
      icon: '',
      onOk() {
        // TODO: 销毁游戏
        console.log(SudSDk)
        SudSDk && SudSDk.onDestroy()
        setTimeout(() => {
          location.href = '/'
        }, 500)
      }
    })
  }

  return (
    <div className={cx('container')}>
      <div className={cx('game-container')}>
        {/* game 容器 */}
        <img src={Close} onClick={destory} alt="" className={cx('close')} />
        <div id='game' className={cx('game-wrap')}></div>
      </div>
    </div>
  )
}

export default withRouter(GameDetail)
