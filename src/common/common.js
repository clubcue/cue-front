import { Loading } from 'element-ui'

let loading

// 网络请求的错误处理
const handleErrorMsg = function (error) {
  console.log(error)
  switch (error) {
    case 0:
      return '错误码：0，错误信息：服务器错误'
    case 400:
      return '错误码：400，错误信息：请求无效'
    case 401:
      return '错误码：401，错误信息：权限不足'
    case 403:
      return '错误码：403，错误信息：禁止访问'
    case 404:
      return '错误码：404，错误信息：未找到页面'
    case 405:
      return '错误码：405，错误信息：方法不允许'
    case 406:
      return '错误码：406，错误信息：不可接受'
    case 408:
      return '错误码：408，错误信息：请求超时'
    case 410:
      return '错误码：410，错误信息：所请求的资源在服务器端永久不存在'
    case 413:
      return '错误码：413，错误信息：请求实体太大'
    case 414:
      return '错误码：414，错误信息：请求的URL太长'
    case 500:
      return '错误码：500，错误信息：Web服务器无法执行该请求'
    case 501:
      return '错误码：501，错误信息：由于服务器临时性超载或维护，服务器当前无法处理该请求'
    case 502:
      return '错误码：502，错误信息：为了完成该请求，该服务器访问上游服务器但收到无效响应'
    default:
      return '对不起，目前服务端出现异常，请联系管理员进行处理（未知类型错误）'
  }
}
const startLoading = function () {
  loading = Loading.service({
    lock: true,
    text: '加载中......',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
const endLoading = function () {
  loading.close()
}

export {
  handleErrorMsg,
  startLoading,
  endLoading
}
