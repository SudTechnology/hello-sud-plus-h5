// import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import { Asr } from 'utils/asr'

export class Recorder {
  public static pause = false
  public static stop = true

  public static async startRecord(ondataavailable: (data: Blob, length: number) => void) {
    this.stop = false
    this.pause = false
    Asr.startRecord({
      onProcess(buffer) {
        const pcm = buffer
        ondataavailable && ondataavailable(pcm, pcm.size)
      }
    })
  }

  public static stopRecord(stopRecord: () => void) {
    this.stop = true
    Asr.stop()
    stopRecord && stopRecord()
  }

  public static pauseRecord() {
    Asr.pause()
    this.pause = true
  }
}
