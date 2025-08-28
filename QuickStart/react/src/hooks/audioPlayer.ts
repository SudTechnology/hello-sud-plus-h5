
interface AudioItem {
  src: string
  data: any
}

export class AudioPlayer {
  private audioQueue: AudioItem[] = []; // 音频URL队列
  private currentIndex: number = 0; // 当前播放索引
  private isPlaying: boolean = false;
  private isInitialized: boolean = false;
  private audioElement: HTMLAudioElement;
  private curAudio: AudioItem | null = null
  private endListener: ((data: AudioItem | null) => void) | null = null

  // 播放器状态接口

  constructor() {
    // 创建audio元素
    this.audioElement = document.createElement('audio')
    this.audioElement.controls = true
    document.body.appendChild(this.audioElement)

    // 绑定事件监听器
    this.bindEvents()
  }

  setEndListener(listener: (data: AudioItem | null) => void) {
    this.endListener = listener
  }

  // 绑定事件监听器
  private bindEvents(): void {
    // 监听音频结束事件，播放下一首
    this.audioElement.addEventListener('ended', () => {
      this.endListener && this.endListener(this.curAudio)
      this.removeCurrentAndPlayNext() // 移除当前并播放下一个
    })

    this.audioElement.addEventListener('error', (e: Event) => {
      this.endListener && this.endListener(this.curAudio)
      this.removeCurrentAndPlayNext() // 出错时移除当前并播放下一个
    })

    // 用户触摸事件（iOS自动播放需要）
    document.addEventListener('touchstart', () => {
      this.handleFirstInteraction()
    }, { once: true })

    // 点击事件同样处理
    document.addEventListener('click', () => {
      this.handleFirstInteraction()
    }, { once: true })

    // 微信环境特殊处理
    // if (typeof WeixinJSBridge !== 'undefined') {
    //   document.addEventListener('WeixinJSBridgeReady', () => {
    //     console.log('微信环境准备就绪')
    //     this.isInitialized = true
    //     this.tryPlay() // 微信环境就绪后尝试播放
    //   })
    // }
  }

  // 处理首次用户交互
  private handleFirstInteraction(): void {
    console.log('检测到用户交互，激活音频播放')
    this.isInitialized = true
    this.tryPlay() // 尝试播放队列中的音频
  }

  // 尝试播放队列中的音频
  private tryPlay(): void {
    if (this.audioQueue.length > 0 && !this.isPlaying) {
      this.playCurrent()
    }
  }

  // 添加音频源到队列（外部唯一需要调用的接口）
  public pushSrc({ src, data }: {src: string, data: any}): number {
    this.audioQueue.push({ src, data })

    // 如果已初始化且当前没有在播放，自动开始播放
    if (this.isInitialized && !this.isPlaying) {
      this.playCurrent()
    }

    return this.audioQueue.length
  }

  // 移除当前音频并播放下一个
  private removeCurrentAndPlayNext(): void {
    // 移除当前播放的音频
    if (this.audioQueue.length > 0) {
      this.audioQueue.shift() // 移除队列第一个元素
    }

    // 播放下一个
    if (this.audioQueue.length > 0) {
      this.playCurrent()
    } else {
      this.isPlaying = false
    }
  }

  // 播放当前音频
  private playCurrent(): void {
    if (this.currentIndex >= this.audioQueue.length) {
      this.isPlaying = false
      return
    }

    this.curAudio = this.audioQueue[this.currentIndex]
    const src = this.curAudio.src
    console.log(`准备播放: ${src} (${this.currentIndex + 1}/${this.audioQueue.length})`)

    this.audioElement.src = src

    this.audioElement.play()
      .then(() => {
        this.isPlaying = true
      })
      .catch((error: Error) => {
        console.error('播放失败:', error)
        this.removeCurrentAndPlayNext() // 失败时移除并播放下一个
      })
  }

  // 清空队列（可选）
  public clearQueue(): void {
    this.audioQueue = []
    this.currentIndex = 0
    if (this.isPlaying) {
      this.audioElement.pause()
      this.isPlaying = false
    }
    console.log('音频队列已清空')
  }
}
