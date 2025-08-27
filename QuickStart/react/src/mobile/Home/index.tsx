import React, { useState } from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import { useHome } from 'hooks/useHome'
import { Input, Form, Tabs } from 'antd-mobile'
import LLMBotIcon from 'assets/llm.png'
const cx = classnames.bind(styles)

const Home = () => {
  const [env, setEnv] = useState(Number(localStorage.getItem('env')) || 3)
  const [appId, setAppId] = useState(localStorage.getItem('localAppId') || '1461564080052506636')
  const [curTab, setCurTab] = useState('all')

  const { list, llmbotList } = useHome()
  const [form] = Form.useForm()

  const toPath = (item: any) => {
    const values = form.getFieldsValue()
    const basePath = curTab === 'llmbot' ? '/llmbot' : '/game'
    console.log('[ values ] >', values)
    let url = `${basePath}/${item.mgId}?orientation=${item.orientation}`
    if (values.roomId) {
      url += `&roomId=${values.roomId}`
    }
    if (values.userId) {
      url += `&userId=${values.userId}`
    }
    if (values.language) {
      url += `&language=${values.language}`
    }
    console.log(url)

    location.href = url
  }

  const changeEnv = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('[ e ] >', e.target.value)
    const value = Number(e.target.value)
    setEnv(value)
    localStorage.setItem('env', e.target.value)
  }

  const changeAPP = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('[ e ] >', e.target.value)
    const value = e.target.value
    setAppId(value)
    localStorage.setItem('localAppId', value)
  }

  return (
    <div className={cx('container')}>
      <div>
        <Form form={form} layout='horizontal'>
          <Form.Item label='房间号ID' name='roomId'>
            <Input type="number" placeholder='请输入房间号ID' clearable />
          </Form.Item>
          <Form.Item label='语言' name='language'>
            <Input placeholder='请输入语言值value' clearable />
          </Form.Item>
          <Form.Item label='userId' name='userId'>
            <Input clearable placeholder='请输入userId' />
          </Form.Item>
        </Form>
      </div>
      <div className={cx('form-item')}>
        <label className={cx('form-item-lable')}>环境: </label>
        <select value={env} onChange={(e) => changeEnv(e)}>
          <option value={4}>开发环境dev</option>
          <option value={3}>测试环境fat</option>
          <option value={2}>sim环境</option>
          <option value={1}>pro环境</option>
        </select>
      </div>
      <div className={cx('form-item')}>
        <label className={cx('form-item-lable')}>appId: </label>
        <select value={appId} onChange={(e) => changeAPP(e)}>
          <option value={'1461564080052506636'}>1461564080052506636</option>
          <option value={'1486637108889305089'}>1486637108889305089</option>
          <option value={'1658379102832939010'}>1658379102832939010</option>
        </select>
      </div>
      {/* 游戏列表 */}
      <Tabs className={cx('tabs')} onChange={(key) => setCurTab(key)}>
        <Tabs.Tab title='全部' key='all'>
          <div className={cx('game-list')}>
            {
              list.map((item: any) => {
                return (
                  <a onClick={() => toPath(item)} key={item.mgId} className={cx('game-item')}>
                    {
                      item.llmbot && <span className={cx('llmbot')}><img className={cx('llmbot-game')} src={LLMBotIcon} alt="" /></span>
                    }
                    <img className={cx('game-logo')} src={item.scenePic} alt="" />
                    <div className={cx('game-title')}>{item.gameName}</div>
                  </a>
                )
              })
            }
          </div>
        </Tabs.Tab>
        <Tabs.Tab title='LLMBOT' key='llmbot'>
          <div className={cx('game-list')}>
            {
              llmbotList.map((item: any) => {
                return (
                  <a onClick={() => toPath(item)} key={item.mgId} className={cx('game-item')}>
                    {
                      item.llmbot && <span className={cx('llmbot')}><img className={cx('llmbot-game')} src={LLMBotIcon} alt="" /></span>
                    }
                    <img className={cx('game-logo')} src={item.scenePic} alt="" />
                    <div className={cx('game-title')}>{item.gameName}</div>
                  </a>
                )
              })
            }
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default Home
