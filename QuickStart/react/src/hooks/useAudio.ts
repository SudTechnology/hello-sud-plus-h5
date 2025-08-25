import { useRef } from "react"
import { Howl } from 'howler'
const audioInstances: Array<Howl> = []
export const useAudio = () => {
  // const [isAudioInitialized, setIsAudioInitialized] = useState(false)
  const isInitializedRef = useRef(false) // 存储最新值的引用

  const initAudio = () => {
    console.log('[ click initAudio] >')
    // if (isInitializedRef.current) {
    //   return
    // }
    console.log('[ setclick ] >')
    isInitializedRef.current = true
    if (audioInstances.length > 0) {
      audioInstances[0].play()
    }
  }

  const pushAudio = (data: any, onend = () => {}) => {
    if (!isInitializedRef.current) {
      console.warn("音频环境未初始化，请先调用initAudio()")
      return null
    }
    const sound = new Howl({
      src: `data:audio/wav;base64,${data.audioData}`, // 支持本地路径或 URL
      html5: true, // 启用 HTML5 Audio 模式（解决移动端限制）
      volume: 0.8, // 初始音量（0~1）
      loop: false, // 循环播放
      onend: () => {
        onend && onend()
        // 从实例数组中移除
        const index = audioInstances.indexOf(sound)
        if (index !== -1) {
          audioInstances.splice(index, 1)
        }
      },
      onloaderror: (e) => console.log(e, 'play error')
      // 事件监听
    })
    sound.play()
    audioInstances.push(sound)
  }

  return {
    initAudio,
    pushAudio
  }
}
