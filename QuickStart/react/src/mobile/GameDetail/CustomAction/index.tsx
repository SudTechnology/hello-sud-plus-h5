import React, { useEffect, useState } from 'react'
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
  const [visibleCustomMsg, setVisibleCustomMsg] = useState(false)

  const [volum, setVolum] = useState(100) // 音量
  const [visibleGameSetting, setVisibleGameSetting] = useState(false)
  const [visibleCustomGameSetting, setVisibleCustomGameSetting] = useState(false)

  const [visibleViewSize, setVisibleViewSize] = useState(false) // 游戏容器宽高设置
  const width = document.body.clientWidth
  const height = document.body.clientHeight
  const aiDefaultSettingList = [1, 2, 3]

  useEffect(() => {
    const gameViewSize = localStorage.getItem('viewSize')
    if (gameViewSize) {
      const localData = JSON.parse(gameViewSize)
      const game = document.getElementById('game')
      if (game) {
        const gameRootRect = localData.gameRootRect
        game.style.width = localData.width + 'px'
        game.style.height = localData.height + 'px'
        if (gameRootRect) {
          game.style.left = gameRootRect.left + 'px'
          game.style.right = gameRootRect.right + 'px'
          game.style.top = gameRootRect.top + 'px'
          game.style.bottom = gameRootRect.bottom + 'px'
        }
      }
    }
  }, [])

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
    console.log('[ value ] >', values)
    localStorage.setItem('gameconfig', JSON.stringify(values))
    location.reload()
  }

  const onFinishGameViewSize = (values: any) => {
    console.log('[ value ] >', values, JSON.stringify(values))
    for (const item in values.viewGameRect) {
      values.viewGameRect[item] = Number(values.viewGameRect[item])
    }
    for (const gitem in values.gameRootRect) {
      values.gameRootRect[gitem] = Number(values.gameRootRect[gitem])
    }

    console.log('[ value ] >', values, JSON.stringify(values))
    localStorage.setItem('viewSize', JSON.stringify(values))
    location.reload()
  }

  // 通知游戏重连
  const setGameReconncet = () => {
    SudSDK.sudFSTAPPDecorator.notifyAPPCommon('app_common_game_reconnect', JSON.stringify({}))
  }
  // 发送自定义消息
  const onFinishSendCustomMsg = (values: any) => {
    const name = values.name
    const content = values.content
    console.log('onFinishSendCustomMsg[ values ] >', values)
    console.log('[ typeof content ] >', JSON.parse(content))
    SudSDK.sudFSTAPPDecorator.notifyAPPCommon(name, content, {
      onSuccess() {
        console.log('[ success ] >')
        // 成功后关闭窗口
        setVisibleCustomMsg(false)
      },
      onFailure(e: number, msg: any) {
        console.log('[ e, msg ] >', e, msg)
      }
    })
  }

  const onFinishSendCustomGameCfg = (values: any) => {
    const data = values.data
    localStorage.setItem('gameconfig', data)
    location.reload()
  }

  return (
    <div>
      <div className={cx('info')}>屏幕参数 view_size: width: {window.innerWidth}px ,height:{window.innerHeight}px</div>
      <Popup
        visible={showAction}
        onMaskClick={() => {
          setShowAction(false)
        }}
        position='right'
        bodyStyle={{ width: '40vw', overflow: 'auto' }}
        >
      <div className={cx('action-btn')}>
        <button onClick={() => setVisibleGameSetting(true)}>Game Cfg 配置</button>
        <button onClick={() => setVisibleCustomGameSetting(true)}>自定义Game Cfg 配置</button>
        <button onClick={() => setVisibleViewSize(true)}>Game ViewInfo</button>

        <button onClick={() => setVisibleGameInfo(true)}>设置游戏玩法</button>
        <button onClick={() => setVisible(true)}>设置AI玩家</button>

        <button onClick={customActionHook.userSelfQuickGame}>玩家自己退出游戏</button>
        <button onClick={customActionHook.pushAIPlayer}>自动添加AI玩家</button>
        <button onClick={customActionHook.closeBgMusic}>关闭背景音乐</button>
        <button onClick={customActionHook.closeMusic}>关闭音效</button>

        <button onClick={() => setvisibleVolume(true)}>调节游戏音量</button>
        <button onClick={() => setVisibleShiftUser(true)}>踢人</button>
        <button onClick={() => setGameReconncet()}>通知重连</button>
        <button onClick={() => setVisibleCustomMsg(true)}>自定义消息</button>

        <button onClick={customActionHook.quitGame}>退出游戏</button>
        <button onClick={customActionHook.joinGame}>加入游戏</button>
        <button onClick={customActionHook.readyGame}>准备</button>
        <button onClick={customActionHook.cancelReadyGame}>取消准备</button>
        <button onClick={customActionHook.startGame}>开始游戏</button>
      </div>
      </Popup>
      <div className={cx('action-control')}>
        {/* <button onClick={() => setShowAction(false)}>隐藏</button> */}
        <button onClick={() => setShowAction(true)}>调试</button>
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
        getContainer={() => document.body}
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
        getContainer={() => document.body}
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
        getContainer={() => document.body}
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

      <Modal
        visible={visibleViewSize}
        closeOnAction
        closeOnMaskClick
        title="viewinfo"
        getContainer={() => document.body}
        onClose={() => {
          setVisibleViewSize(false)
        }}
        content={
          <div>
            <Form
              onFinish={onFinishGameViewSize}
              footer={
              <Button block type='submit' color='primary' size="middle">
                确定
              </Button>
              }
              className={cx('form')}
              layout='horizontal'>
              <header>view_size</header>
              <Form.Item name="width" rules={[{ required: true }]} required initialValue={width} label="宽" extra={<span>px</span>}>
                <Input type="number" placeholder="请输入" />
              </Form.Item>
              <Form.Item name="height"
                rules={[{ required: true }]}
                required initialValue={height} label="高" extra={<span>px</span>}>
                <Input type="number" placeholder="请输入" />
              </Form.Item>
              <header>view_game_rect（相对游戏容器）</header>
              <Form.Item name={["viewGameRect", "left"]} rules={[{ required: true }]} required initialValue={0} label="left" extra={<span>px</span>}>
                <Input type="number" placeholder="请输入" />
              </Form.Item>
              <Form.Item name={["viewGameRect", "top"]}
                rules={[{ required: true }]}
                required initialValue={0} label="top" extra={<span>px</span>}>
                <Input type="number" placeholder="请输入" />
              </Form.Item>
              <Form.Item name={["viewGameRect", "right"]}
                rules={[{ required: true }]}
                required initialValue={0} label="right" extra={<span>px</span>}>
                <Input type="number" placeholder="请输入" />
              </Form.Item>
              <Form.Item name={["viewGameRect", "bottom"]}
                rules={[{ required: true }]}
                required initialValue={0} label="bottom" extra={<span>px</span>}>
                <Input type="number" placeholder="请输入" />
              </Form.Item>
              <header>游戏容器位置（相对页面窗口）</header>
              <Form.Item name={["gameRootRect", "left"]} rules={[{ required: true }]} required initialValue={0} label="left" extra={<span>px</span>}>
                <Input type="number" placeholder="请输入" />
              </Form.Item>
              <Form.Item name={["gameRootRect", "top"]}
                rules={[{ required: true }]}
                required initialValue={0} label="top" extra={<span>px</span>}>
                <Input type="number" placeholder="请输入" />
              </Form.Item>
              <Form.Item name={["gameRootRect", "right"]}
                rules={[{ required: true }]}
                required initialValue={0} label="right" extra={<span>px</span>}>
                <Input type="number" placeholder="请输入" />
              </Form.Item>
              <Form.Item name={["gameRootRect", "bottom"]}
                rules={[{ required: true }]}
                required initialValue={0} label="bottom" extra={<span>px</span>}>
                <Input type="number" placeholder="请输入" />
              </Form.Item>
            </Form>
          </div>
        }
      />

      <Modal
        visible={visibleCustomGameSetting}
        closeOnAction
        closeOnMaskClick
        getContainer={() => document.body}
        onClose={() => {
          setVisibleCustomGameSetting(false)
        }}
        title="自定义Game Cfg 配置"
        content={
          <div>
            <Form
              onFinish={onFinishSendCustomGameCfg}
              footer={
              <Button block type='submit' color='primary' size="middle">
                确定
              </Button>
              }
              className={cx('form')}
              layout='horizontal'>
              <Form.Item layout="vertical" name="data" label="内容 （json字符串方式）">
                <TextArea rows={4} placeholder="请输入" />
              </Form.Item>
            </Form>
          </div>
        }
      />

      <Modal
        visible={visibleCustomMsg}
        closeOnAction
        closeOnMaskClick
        getContainer={() => document.body}
        onClose={() => {
          setVisibleCustomMsg(false)
        }}
        content={
          <div>
            <Form
              onFinish={onFinishSendCustomMsg}
              footer={
              <Button block type='submit' color='primary' size="middle">
                发送
              </Button>
              }
              className={cx('form')}
              layout='horizontal'>
              <Form.Item name="name" label="消息名称">
                <Input clearable placeholder="请输入" />
              </Form.Item>
              <Form.Item layout="vertical" name="content" label="消息内容 （纯对象方式）">
                <TextArea rows={4} placeholder="请输入" />
              </Form.Item>
            </Form>
          </div>
        }
      />

    </div>
  )
}

export default CustomAction
