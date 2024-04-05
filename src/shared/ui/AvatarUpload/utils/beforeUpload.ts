import type { RcFile } from 'antd/es/upload'
import { message } from 'antd'

export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('Для загрузки доступны только файлы в формате JPG/PNG!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Изображение должно быть меньше 2 МБ!')
  }
  return isJpgOrPng && isLt2M
}
