import React, { useState } from 'react'
import useCustomApi from 'hooks/useCustomApi'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import { Popup, Form, Input, Button, Modal, TextArea, Slider } from 'antd-mobile'
import { SDKGameView } from 'QuickStart' // SudMGP类型
import GameSetting from './GameSetting'
const cx = classnames.bind(styles)

const CustomAction = (props: {SudSDK: SDKGameView | undefined}) => {
  const SudSDK = props.SudSDK as SDKGameView
  const customActionHook = useCustomApi(SudSDK)
  const [showAction, setShowAction] = useState(false) // 显示隐藏自定义的操作按钮
  const [visible, setVisible] = useState(false)
  const [visibleGameInfo, setVisibleGameInfo] = useState(false)
  const [visibleShiftUser, setVisibleShiftUser] = useState(false)
  const [visibleVolume, setvisibleVolume] = useState(false)
  const [volum, setVolum] = useState(100) // 音量
  const [visibleGameSetting, setVisibleGameSetting] = useState(true)

  const aiDefaultSettingList = [1, 2, 3]

  // 设置AI玩家
  const onFinishAIPlayer = (values: any) => {
    console.log('[ valuse ] >', values)
    const list: any[] = []
    aiDefaultSettingList.map((item) => {
      return list.push({
        userId: values[`userId${item}`],
        avatar: values[`avatar${item}`],
        name: values[`name${item}`],
        gender: values[`gender${item}`]
      })
    })
    console.log('[ list ] >', list)
    SudSDK.sudFSTAPPDecorator.notifyAPPCommonGameAddAIPlayers(list, values.isReady)
    setVisible(false)
  }
  // 设置游戏玩法
  const onFinishGameSelectInfo = (values: any) => {
    if (!values.select) {
      setVisibleGameInfo(false)
    }
    SudSDK.sudFSTAPPDecorator.notifyAPPCommonGameSettingSelectInfo(values.select)
    setVisibleGameInfo(false)
  }
  // 踢人
  const onFinishShiftUser = (values: any) => {
    if (!values.id) {
      setVisibleShiftUser(false)
    }
    SudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfKick(values.id)
    setVisibleShiftUser(false)
  }

  const onFinishGameSetting = (values: any) => {
    localStorage.setItem('gameconfig', JSON.stringify(values.value))
    location.reload()
  }
  return (
    <div>
      <div className={cx('info')}>屏幕参数 view_size: width: {window.innerWidth} ,height:{window.innerHeight}</div>
      {
        showAction && <>
          <div className={cx('action-btn')}>
            <button onClick={() => setVisibleGameSetting(true)}>Game Cfg 配置</button>

            <button onClick={() => setVisibleGameInfo(true)}>设置游戏玩法</button>
            <button onClick={() => setVisible(true)}>设置AI玩家</button>

            <button onClick={customActionHook.userSelfQuickGame}>玩家自己退出游戏</button>
            <button onClick={customActionHook.pushAIPlayer}>自动添加AI玩家</button>
            <button onClick={customActionHook.closeBgMusic}>关闭背景音乐</button>
            <button onClick={customActionHook.closeMusic}>关闭音效</button>

            <button onClick={() => setvisibleVolume(true)}>调节游戏音量</button>
            <button onClick={() => setVisibleShiftUser(true)}>踢人</button>

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
      <GameSetting
        onClose={() => setVisibleGameSetting(false)}
        onFinish={(value) => onFinishGameSetting(value)}
        visible={visibleGameSetting}
      />
      <Popup
        visible={visible}
        position='right'
        showCloseButton
        onClose={() => setVisible(false)}
        bodyStyle={{ width: '100vw', padding: '30px 0', overflowY: 'scroll' }}
       >
        <Form layout='horizontal'
          className={cx('form')}
           onFinish={onFinishAIPlayer}
           footer={
              <Button block type='submit' color='primary' size='large'>
                确认
              </Button>
            }
          >
           <Form.Header>设置游戏AI玩家</Form.Header>
           {
              aiDefaultSettingList.map((item) => {
                return (
                  <React.Fragment key={item}>
                    <Form.Item initialValue={`${item}`} name={`userId${item}`} label={`userId${item}`}>
                      <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item initialValue={`https://dev-sud-static.sudden.ltd/avatar/${item}.jpg`} name={`avatar${item}`} label={`avatar${item}`}>
                      <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item initialValue={'name' + item} name={`name${item}`} label={`name${item}`}>
                      <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item initialValue="male" name={`gender${item}`} label={`gender${item}`}>
                      <Input placeholder='请输入' />
                    </Form.Item>
                  </React.Fragment>
                )
              })
            }
            <Form.Item label="isReady" name="isReady" initialValue="1">
              <Input />
            </Form.Item>
        </Form>
      </Popup>

      <Modal
        visible={visibleGameInfo}
        closeOnAction
        closeOnMaskClick
        content={
          <div>
            <Form
              onFinish={onFinishGameSelectInfo}
              footer={
              <Button block type='submit' color='primary' size="middle">
                确认
              </Button>
              }
              className={cx('form')}
              layout='horizontal'>
              <Form.Item initialValue={JSON.stringify({ mode: 0, chessNum: 2, item: 1 })} name="select" label="Select">
                <TextArea />
              </Form.Item>
            </Form>
          </div>
        }
        onClose={() => {
          setVisibleGameInfo(false)
        }}
      />

      <Modal
        visible={visibleShiftUser}
        closeOnAction
        closeOnMaskClick
        content={
          <div>
            <Form
              onFinish={onFinishShiftUser}
              footer={
              <Button block type='submit' color='primary' size="middle">
                踢他
              </Button>
              }
              className={cx('form')}
              layout='horizontal'>
              <Form.Item name="id" label="用户ID">
                <Input placeholder="请输入" />
              </Form.Item>
            </Form>
          </div>
        }
        onClose={() => {
          setVisibleShiftUser(false)
        }}
      />
      <Modal
        closeOnAction
        visible={visibleVolume}
        closeOnMaskClick
        onClose={() => setvisibleVolume(false)}
        bodyStyle={{ height: '110px' }}
        content={
          <div>
          <Slider
            popover
            defaultValue={100}
            onAfterChange={(value: number | number[]) => {
              console.log('[ value ] >', value)
              if (typeof value === 'number') {
                setVolum(value)
                SudSDK.sudFSTAPPDecorator.notifyAPPCommonGameSoundVolume(value)
              }
            }}/>
          <div style={{ textAlign: 'center' }}>{volum}</div>
        </div>
        }
      />

    </div>
  )
}

export default CustomAction