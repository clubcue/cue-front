let ws = null // 实现WebSocket
let record = null // 多媒体对象，用来处理音频

function init (rec) {
  record = rec
}

// 录音对象
const Recorder = function (stream) {
  console.log('1录音对象开始执行')
  let sampleBits = 16 // 输出采样数位 8, 16
  let sampleRate = 8000 // 输出采样率
  let context = new AudioContext()
  let audioInput = context.createMediaStreamSource(stream)
  console.log('1.1audioInput')
  console.log(audioInput)
  let recorder = context.createScriptProcessor(4096, 1, 1)
  let audioData = {
    size: 0, // 录音文件长度
    buffer: [], // 录音缓存
    inputSampleRate: 48000, // 输入采样率
    inputSampleBits: 16, // 输入采样数位 8, 16
    outputSampleRate: sampleRate, // 输出采样数位
    oututSampleBits: sampleBits, // 输出采样率
    clear () {
      this.buffer = []
      this.size = 0
    },
    input (data) {
      this.buffer.push(new Float32Array(data))
      this.size += data.length
    },
    compress () { // 合并压缩
      // 合并
      let data = new Float32Array(this.size)
      let offset = 0
      for (let i = 0; i < this.buffer.length; i++) {
        data.set(this.buffer[i], offset)
        offset += this.buffer[i].length
      }
      // 压缩
      let compression = parseInt(this.inputSampleRate / this.outputSampleRate)
      let length = data.length / compression
      let result = new Float32Array(length)
      let { index, j } = 0
      while (index < length) {
        result[index] = data[j]
        j += compression
        index++
      }
      return result
    },
    encodePCM () { // 这里不对采集到的数据进行其他格式处理，如有需要均交给服务器端处理。
      sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate)
      let sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits)
      let bytes = this.compress()
      let dataLength = bytes.length * (sampleBits / 8)
      let buffer = new ArrayBuffer(dataLength)
      let data = new DataView(buffer)
      let offset = 0
      for (let i = 0; i < bytes.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, bytes[i]))
        data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
      }
      return new Blob([data])
    }
  }
  console.log('audioData录音对象')
  console.log(audioData)
  let sendData = function () { //  对以获取的数据进行处理(分包)
    console.log('对以获取的数据进行处理(分包)')
    let reader = new FileReader()
    console.log(reader)
    reader.onload = e => {
      let outbuffer = e.target.result
      let arr = new Int8Array(outbuffer)
      if (arr.length > 0) {
        let tmparr = new Int8Array(1024)
        let j = 0
        for (let i = 0; i < arr.byteLength; i++) {
          tmparr[j++] = arr[i]
          if (((i + 1) % 1024) === 0) {
            ws.send(tmparr)
            if (arr.byteLength - i - 1 >= 1024) {
              tmparr = new Int8Array(1024)
            } else {
              tmparr = new Int8Array(arr.byteLength - i - 1)
            }
            j = 0
          }
          if ((i + 1 === arr.byteLength) && ((i + 1) % 1024) !== 0) {
            ws.send(tmparr)
          }
        }
      }
    }
    reader.readAsArrayBuffer(audioData.encodePCM())
    audioData.clear()//  每次发送完成则清理掉旧数据
  }

  this.start = function () {
    console.log('this.start')
    audioInput.connect(recorder)
    recorder.connect(context.destination)
  }

  this.stop = function () {
    console.log('this.stop')
    recorder.disconnect()
  }

  this.getBlob = function () {
    console.log('this.getBlob')
    return audioData.encodePCM()
  }

  this.clear = function () {
    console.log('this.clear')
    audioData.clear()
  }
  sendData()
  console.log('++++++++++onaudioprocess++++++++++++')
  // 以fftSize为长度创建一个字节数组作为数据缓冲区
  // let output = new Uint8Array(audioData.buffer)
  // recorder.onaudioprocess = function (e) {
  //   console.log('++++++++++内部onaudioprocess++++++++++++')
  //   let inputBuffer = e.inputBuffer.getChannelData(0)
  //   audioData.input(inputBuffer)
  //   console.log('onaudioprocess-audioData')
  //   console.log(audioData)
  //   sendData()
  // }
  // recorder.onaudioprocess = function (e) {
  //   console.log('++++++++++内部onaudioprocess++++++++++++')
  //   let inputBuffer = e.inputBuffer.getChannelData(0)
  //   audioData.input(inputBuffer)
  //   console.log('onaudioprocess-audioData')
  //   console.log(audioData)
  //   sendData()
  // }
}

/*
* WebSocket
*/
const useWebSocket = function () {
  ws = new WebSocket('ws://192.168.2.9:8080/websocket')
  ws.binaryType = 'arraybuffer' //  传输的是 ArrayBuffer 类型的数据
  ws.onopen = function () {
    console.log('握手成功')
    if (ws.readyState === 1) { //  ws进入连接状态，则每隔500毫秒发送一包数据
      record.start()
    }
  }
  ws.onmessage = function (msg) {
    console.info(msg)
  }

  ws.onerror = function (err) {
    console.info(err)
  }
}

/*
* 开始对讲
*/
const begin = function () {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
  if (!navigator.getUserMedia) {
    alert('浏览器不支持音频输入')
  } else {
    navigator.getUserMedia({audio: true},
      function (mediaStream) {
        init(new Recorder(mediaStream))
        console.log('开始对讲')
        useWebSocket()
      }, function (error) {
        console.log(error)
        switch (error.message || error.name) {
          case 'PERMISSION_DENIED':
          case 'PermissionDeniedError':
            console.info('用户拒绝提供信息。')
            break
          case 'NOT_SUPPORTED_ERROR':
          case 'NotSupportedError':
            console.info('浏览器不支持硬件设备。')
            break
          case 'MANDATORY_UNSATISFIED_ERROR':
          case 'MandatoryUnsatisfiedError':
            console.info('无法发现指定的硬件设备。')
            break
          default:
            console.info('无法打开麦克风。异常信息:' + (error.code || error.name))
            break
        }
      }
    )
  }
}

/*
* 关闭对讲
*/
const end = function () {
  console.log('关闭对讲以及WebSocket')
  if (ws) {
    ws.close()
    record.stop()
    console.log('关闭对讲以及WebSocket')
  }
}
export {
  Recorder,
  useWebSocket,
  begin,
  end
}
