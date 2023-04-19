
import Recorder from './recorder'
interface Icallback {
  onProcess: (buffer: any, dataLength: number) => void
}

export class Asr {
  static recorder: Recorder
  static context: AudioContext
  static readonly numChannels = 1 // 声道
  public static startRecord(callback: Icallback) {
    this.recorder = new Recorder({
      sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
      sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1, // 声道，支持 1 或 2， 默认是1
      compiling: true // (0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    })
    this.recorder.start()
    this.recorder.onEveryProgress = (pcm) => {
      callback.onProcess(pcm, pcm.byteLength)
    }
  }

  public static stop() {
    this.recorder.stop()
  }
}
