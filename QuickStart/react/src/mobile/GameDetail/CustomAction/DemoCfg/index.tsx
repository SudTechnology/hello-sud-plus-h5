import React from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import { Popup, Form, Button, Switch } from 'antd-mobile'
import { useHome } from 'hooks/useHome'
import { loadGame } from 'hooks/useGameDetail'
import { getQueryParam } from 'utils'
import { SDKGameView } from 'QuickStart' // SudMGP类型

const cx = classnames.bind(styles)
interface IProp {
  visible: boolean
  onClose: () => void
  SudSdk: SDKGameView | undefined
  updateSdkInstance: (sdk: SDKGameView | undefined) => void
  onFinish: (value: any) => void
}
const DemoCfg: React.FC<IProp> = (props) => {
  const { SudSdk } = props
  const [form] = Form.useForm()
  const { list } = useHome()
  function changeGame(gameId: string) {
    const roomId = getQueryParam('roomId') || Math.floor((Math.random() + 1) * 10000).toString()
    const userId = getQueryParam('userId')
    const language = getQueryParam('language') || ''
    const sdk = loadGame(gameId, roomId, language, userId)
    props.onClose()
    props.updateSdkInstance(sdk)
  }
  const destory = () => {
    SudSdk && SudSdk.destroyMG()
  }
  return (
    <Popup
      visible={props.visible}
      position='right'
      showCloseButton
      bodyStyle={{ width: '100vw', padding: '30px 0 0', overflowY: 'auto' }}
      onClose={props.onClose}
     >
       <Form
          onFinish={props.onFinish}
          mode='card'
          form={form}
          layout='horizontal'
          className={cx('form')}
          footer={ <Button block type='submit' color='primary' size='large'>
          确认
        </Button>}>
        <Form.Item name={'customLoading'} initialValue={false} label='自定义进度条'>
          <Switch/>
        </Form.Item>
        </Form>
        <div>
          <Button color='primary' onClick={() => destory()}>destoryMG</Button>
        </div>
        <div className={cx('title')}>
          点击切换游戏
        </div>
        <div className={cx('game-list')}>
          {/* 游戏列表切换 */}
          {
            list.map((game: any, index) => {
              return <div onClick={() => changeGame(game.sceneId)} key={`${index}${game.sceneId}`} className={cx('game')}>
               <img className={cx('game-logo')} src={game.scenePic} alt="" />
                <div className={cx('game-title')}>{game.sceneName}</div>
              </div>
            })
          }
        </div>
     </Popup>
  )
}

export default DemoCfg
