import React, { useState } from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import { useHome } from 'hooks/useHome'
import { Input, Form, Tabs } from 'antd-mobile'
import LLMBotIcon from 'assets/llm.png'

const cx = classnames.bind(styles)

const Home = () => {
  const { list, llmbotList } = useHome()
  const [form] = Form.useForm()
  const [curTab, setCurTab] = useState('all')

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

  return (
    <div className={cx('container')}>
      <div>
        <Form form={form} layout='horizontal'>
          <Form.Item label='房间号ID' name='roomId'>
            <Input placeholder='请输入房间号ID' clearable />
          </Form.Item>
          <Form.Item label='语言' name='language'>
            <Input placeholder='请输入语言值value' clearable />
          </Form.Item>
          <Form.Item label='userId' name='userId'>
            <Input placeholder='请输入userId' clearable />
          </Form.Item>
        </Form>
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
