import axios, { type AxiosRequestConfig } from 'axios'
import refreshToken from '@/service/api/refreshToken'

interface InternalAxiosRequestConfigRaw extends AxiosRequestConfig {
  requestCount: number
}
type AxiosResponseRaw = axios.AxiosResponse & { config: InternalAxiosRequestConfigRaw }

const instance = axios.create({ baseURL: process.env.VUE_BASE_URL, timeout: 3000 })
const { interceptors } = instance
const pendingRequest = new Map()
const RETRY_COUNT = 3 // 重复请求次数
let inRefreshing = false // 当前是否正在请求刷新token
let wating: any[] = [] // 报401的接口 加入等待列表 刷新接口成功后统一请求

function getRequestKey(config: axios.AxiosRequestConfig) {
  if (Reflect.has(config, 'url')) {
    const { method, url } = config
    return [method?.toUpperCase(), url].join(' ')
  }
}

function addPendingRequest(config: axios.AxiosRequestConfig) {
  const requestKey = getRequestKey(config)
  const { cancel, token } = axios.CancelToken.source()
  if (!pendingRequest.has(requestKey)) {
    pendingRequest.set(requestKey, cancel)
  }
  config.cancelToken = config.cancelToken ?? token
}
function removePendingRequest(config: axios.AxiosRequestConfig) {
  const requestKey = getRequestKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey)
    cancel(requestKey)
    pendingRequest.delete(requestKey)
  }
}

function onRequestFulfilled(config: axios.InternalAxiosRequestConfig) {
  removePendingRequest(config)
  addPendingRequest(config)
  return config
}

function onRequestRejected(error: any) {
  return Promise.reject(error)
}

function onResponseFulfilled(response: AxiosResponseRaw) {
  if (response.status !== 200) {
    response.config.requestCount = response.config.requestCount ?? 1
    if (response.config.requestCount <= RETRY_COUNT) {
      response.config.requestCount += 1
      return instance(response.config)
    }
    return Promise.reject(response)
  }
  removePendingRequest(response.config)
  return Promise.resolve(response.data)
}

function onResponseRejected(error: any) {
  removePendingRequest(error.config ?? {})
  if (axios.isCancel(error)) {
    console.log(
      `%c被取消的重复请求：${error.message}`,
      'padding:4px 5px; font-size:11px; font-family:"Roboto"; color:#ff3300; background-color:#ff330020'
    )
  } else {
    const { config } = error.response
    // 刷新token正在请求，把其他的接口加入等待数组
    if (inRefreshing) {
      return new Promise(resolve => {
        wating.push({ config, resolve })
      })
    }
    if (error.response.status === 401) {
      inRefreshing = true
      const token = localStorage.getItem('refreshToken')
      refreshToken({ refreshToken: token }).then((refreshResponse: any) => {
        const { success, response } = refreshResponse
        if (success) {
          inRefreshing = false
          const { token, refreshToken } = response
          localStorage.setItem('token', token)
          localStorage.setItem('refreshToken', refreshToken)
          // 刷新token请求成功，等待数据的失败接口重新发起请求
          wating.forEach(({ config, resolve }) => resolve(instance(config)))
          wating = [] // 请求完之后清空等待请求的数组
          return instance(config) // 当前接口重新发起请求
        } else {
          // 刷新token失败 重新登录
          // router.replace('/login')
        }
      })
      return Promise.reject(error)
    }
  }
}

// 请求、响应拦截
interceptors.request.use(onRequestFulfilled, onRequestRejected)
interceptors.response.use(value => onResponseFulfilled(value as AxiosResponseRaw), onResponseRejected)

export function request<T = unknown, D = object>(config: axios.AxiosRequestConfig<D>) {
  return new Promise<T>((resolve, reject) => {
    instance(config)
      .then(data => resolve(data as T))
      .catch(reject)
  })
}
