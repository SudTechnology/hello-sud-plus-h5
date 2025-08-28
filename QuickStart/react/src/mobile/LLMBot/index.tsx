import React, { useState } from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import Close from 'assets/close.png'
import { useLLMbot } from 'hooks/useLLMbot'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { getQueryParam } from 'utils'
import { Modal, Input } from 'antd-mobile'
import { IMGCommonGameBackLobby } from "sudmgp-sdk-js-wrapper/state/ISudMGPMGState"
import CustomAction from 'mobile/GameDetail/CustomAction'
import { AudioOutline, AudioMutedOutline, TravelOutline, PlayOutline } from 'antd-mobile-icons'
import { Recorder } from './rtc'
interface IProps extends RouteComponentProps {

}
const { confirm } = Modal
const cx = classnames.bind(styles)

const LLMBot = (props: IProps) => {
  const params: { id?: string } = props.match.params
  const roomId = getQueryParam('roomId')
  const userId = getQueryParam('userId')
  const language = getQueryParam('language')
  const [openMic, setOpenMic] = useState(false)
  const [text, setText] = useState('')

  // 返回大厅
  const goBack = (data?: IMGCommonGameBackLobby) => {
    if (data && data.leaveGame) {
      // 销毁游戏
      SudSDK && SudSDK.onDestroy()
    }
    setTimeout(() => {
      location.href = '/'
    }, 1000)
  }

  const { realUserId, setUserAudioPlayState, contentInnerRef, contentRef, SudSDK, sendText, addAiBot, aiAgent, aiUserContentList } = useLLMbot(params.id || '', roomId || (params.id || ''), language || 'zh-CN', userId, goBack)

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

  const setMic = async (type: boolean) => {
    setOpenMic(type)
    if (type) {
      // 开启rtc
      Recorder.startRecord((pcm, length) => {
        setUserAudioPlayState(realUserId!, { state: 1, uid: realUserId! })
        aiAgent?.pushAudio(pcm as any, length)
      })
    } else {
      Recorder.stopRecord(() => {
        setUserAudioPlayState(realUserId!, { state: 0, uid: realUserId! })
        aiAgent?.stopAudio()
      })
    }
  }
  const pause = () => {
    Recorder.pauseRecord()
    setUserAudioPlayState(realUserId!, { state: 0, uid: realUserId! })
    aiAgent && aiAgent.pauseAudio()
    // 同步关麦
    setOpenMic(false)
  }

  const sendToAiText = () => {
    console.log('[ text ] >', text)
    sendText(text)
    setText('')
  }

  return (
    <div className={cx('container')} >
      <div className={cx('game-container')}>
        {/* game 容器 */}
        <img src={Close} onClick={destory} alt="" className={cx('close')} />
        <div className={cx('content-list')} ref={contentRef}>
          <div ref={contentInnerRef} >
            {/* ai 回复的文案内容 */}
            {
              aiUserContentList.map((item, index) => {
                return <div className={cx('content-item')} key={index}><span>{item.uid}:</span> {item.content}</div>
              })
            }
          </div>
        </div>

        <div onClick={() => console.log('testtsets')} id='game' className={cx('game-wrap')}></div>
        <CustomAction SudSDK={SudSDK} />
        <div className={cx('button-bar')}>
          <button onClick={addAiBot}>ai bot</button>
        </div>
        <div className={cx('asr-status')}>asr {Recorder.pause ? '暂停了' : Recorder.stop ? '停止了' : '识别中'}</div>

        <div className={cx('action-bar')}>
          <Input value={text} onChange={(val) => setText(val)} className={cx('input')} placeholder='请输入内容' clearable />
          <TravelOutline onClick={sendToAiText} className={cx('icon')} color="#fff"/>
          {
            openMic ? <AudioOutline className={cx('icon')} color="#fff" onClick={() => setMic(false)} /> : <AudioMutedOutline className={cx('icon')} color="#fff" onClick={() => setMic(true)} />
          }
          {/* 暂停语音识别 */}
          <PlayOutline className={cx('icon')} color="#fff" onClick={pause} />
        </div>
      </div>
    </div>
  )
}

export default withRouter(LLMBot)
