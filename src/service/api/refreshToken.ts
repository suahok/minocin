import { request } from '@/service/axios'

export default function refreshToken(data: object) {
  return request({ method: 'post', url: '/refreshToken', data })
}
