import React, { useRef, useState } from 'react'
import { LabASR } from 'byted-ailab-speech-sdk'
// import { getToken } from './helper'
import { buildFullUrl } from './helps'
const ASRStory = () => {
  const [header, setHeader] = useState('')
  const [content, setContent] = useState('')
  const [fullResponse, setFullResponse] = useState({})
  const recordStopping = useRef(false)
  const [asrClient] = useState(
    LabASR({
      onMessage: async (text, fullData) => {
        setContent(text)
        setFullResponse(fullData)
      },
      onStart() {
        setHeader('正在录音')
        setContent('')
      },
      onClose() {
        setHeader('录音结束')
      }
    })
  )
  const startASR = async () => {
    recordStopping.current = false
    const appid = '3341568023'
    // const accessKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiMzM0MTU2ODAyMyJdLCJleHAiOjE3NTM4NzA4MTF9.1YiRXfEdfvkBNrw_xLAfwqz2yYTg7igqugXxJfqDl-0'
    const auth: Record<string, string> = {}
    // 小模型
    // const token = await getToken(appid, accessKey)
    // if (token) {
    //   auth.api_jwt = token
    // }
    // const fullUrl = buildFullUrl('wss://openspeech.bytedance.com/api/v2/asr', auth)
    // const cluster = ''
    // const workflowPunctuation = 'audio_in,resample,partition,vad,fe,decode,nlu_punctuate'
    // const params = {
    //   url: fullUrl,
    //   config: {
    //     app: {
    //       appid: appid,
    //       token: 'access token',
    //       cluster: cluster
    //     },
    //     user: {
    //       uid: 'xxx' // 业务方用户自定义, 方便问题排查
    //     },
    //     audio: {
    //       format: 'pcm',
    //       rate: 16000,
    //       bits: 16,
    //       channel: 1
    //     },
    //     request: {
    //       reqid: uuid(),
    //       workflow: workflowPunctuation,
    //       sequence: 1
    //     }
    //   }
    // }
    // 大模型
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiMzM0MTU2ODAyMyJdLCJleHAiOjE3NTM4NzA4MTF9.1YiRXfEdfvkBNrw_xLAfwqz2yYTg7igqugXxJfqDl-0'
    if (token) {
      auth.api_resource_id = 'volc.bigasr.sauc.duration'
      auth.api_app_key = appid
      auth.api_access_key = `Jwt; ${token}`
    }
    const fullUrl = buildFullUrl(`wss://openspeech.bytedance.com/api/v3/sauc/bigmodel`, auth)
    const params = {
      url: fullUrl,
      config: {
        user: {
          uid: 'byted sdk demo'
        },
        audio: {
          format: 'pcm',
          rate: 16000,
          bits: 16,
          channel: 1
        },
        request: {
          model_name: 'bigmodel',
          show_utterances: true
        }
      }
    }
    asrClient.connect(params)
    await asrClient.startRecord()
  }
  const stopASR = () => {
    // 正在关闭中...
    if (recordStopping.current) {
      return
    }
    recordStopping.current = true
    asrClient.stopRecord()
  }
  return (
  <div>
      <button id='start' onClick={startASR}>
        开始说话
      </button>
      <button id='stop' onClick={stopASR}>
        结束说话
      </button>
      <div id='text-header'>{header}</div>
      <div id='text-content'>{content}</div>
      <pre>{JSON.stringify(fullResponse, null, 2)}</pre>
    </div>
  )
}
export default ASRStory
