import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import Close from 'assets/close.png'
import { useGameDetail } from 'hooks/useGameDetail'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { getQueryParam } from 'utils'
import { Modal } from 'antd-mobile'
import useCustomApi from 'hooks/useCustomApi'
import { IMGCommonGameBackLobby } from "sudmgp-sdk-js-wrapper/state/ISudMGPMGState"

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
  const [showAction, setShowAction] = useState(true) // 显示隐藏自定义的操作按钮

  // 返回大厅
  const goBack = (data?: IMGCommonGameBackLobby) => {
    if (data && data.leaveGame) {
      // 销毁游戏
      SudSDk && SudSDk.onDestroy()
    }
    setTimeout(() => {
      location.href = '/'
    }, 1000)
  }

  const { SudSDk } = useGameDetail(params.id || '', roomId || (params.id || ''), goBack)

  const customActionHook = useCustomApi(SudSDk)

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
        goBack({ leaveGame: 1 })
      }
    })
  }

  return (
    <div className={cx('container')}>
      <div className={cx('game-container')}>
        {/* game 容器 */}
        <img src={Close} onClick={destory} alt="" className={cx('close')} />
        <div id='game' className={cx('game-wrap')}></div>
        {
          showAction && <>
             <div>

            </div>
            <div className={cx('action-btn')}>
              <button onClick={customActionHook.userSelfQuickGame}>玩家自己退出游戏</button>
              <button onClick={customActionHook.setAIPlayer}>设置AI玩家</button>
              <button onClick={customActionHook.closeBgMusic}>关闭背景音乐</button>
              <button onClick={customActionHook.closeMusic}>关闭音效</button>
              <button onClick={customActionHook.quitGame}>退出游戏</button>
              <button onClick={customActionHook.joinGame}>加入游戏</button>
              <button onClick={customActionHook.readyGame}>准备</button>
              <button onClick={customActionHook.cancelReadyGame}>取消准备</button>
              <button onClick={customActionHook.startGame}>开始游戏</button>

            </div>
          </>
        }
        <div className={cx('action-control')}>
          <button onClick={() => setShowAction(false)}>隐藏按钮</button>
          <button onClick={() => setShowAction(true)}>显示按钮</button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(GameDetail)
