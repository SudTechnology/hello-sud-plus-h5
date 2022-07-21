import React, { useEffect } from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import Close from 'assets/close.png'
import { useGameDetail } from 'hooks/useGameDetail'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { getQueryParam } from 'utils'
import { Modal } from 'antd-mobile'
interface IProps extends RouteComponentProps {

}
const { confirm } = Modal
const cx = classnames.bind(styles)

const GameDetail = (props: IProps) => {
  console.log(props)
  const params: { id?: string } = props.match.params
  const orientation = getQueryParam('orientation')
  const roomId = getQueryParam('roomId')
  console.log(params, orientation, 'paramsparamsparams')
  const { SudSDk } = useGameDetail(params.id || '', roomId || (params.id || ''))

  useEffect(() => {
    // 横屏处理
    if (orientation && orientation === '0') {
      rotateScreen()
      window.onresize = function () {
        rotateScreen()
      }
    }
  }, [])

  const rotateScreen = () => {
    const body = document.body
    const width = window.outerWidth
    const height = window.outerHeight
    const isPortrait = window.orientation === 0 || window.orientation === 180 // 竖屏
    // @ts-ignore
    body.style['transform-origin'] = 'center center'
    // 竖屏
    if (isPortrait) {
      body.style.width = height + 'px'
      body.style.height = width + 'px'
      body.style.transform = 'rotate(90deg)'
      const diffDistance = (height - width) / 2
      body.style.left = -diffDistance + 'px'
      body.style.top = diffDistance + 'px'
    } else {
      body.style.width = width + 'px'
      body.style.height = height + 'px'
      // 横屏
      body.style.left = 'unset'
      body.style.top = 'unset'
      body.style.transform = 'rotate(0deg)'
    }
  }

  const destory = () => {
    confirm({
      title: '',
      bodyClassName: 'global-m-info-modal',
      content: '确定要退出吗？',
      onConfirm() {
        // TODO: 销毁游戏
        console.log(SudSDk)
        SudSDk && SudSDk.onDestroy()
        setTimeout(() => {
          location.href = '/'
        }, 1000)
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
