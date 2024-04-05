import { memo, useState } from 'react'
import type { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import type { UploadProps } from 'antd'

import { beforeUpload } from '@/shared/ui/AvatarUpload/utils/beforeUpload'
import { getBase64 } from '@/shared/ui/AvatarUpload/utils/getBase64'

import * as S from './style'
import { Icon } from '@/shared/ui'
import {
  cropperProps,
  modalProps,
} from '@/shared/ui/AvatarUpload/lib/imgCropperProps'

type AvatarUploadProps = {
  setAvatarUrl: (url: string) => void
  avatarUrl: string
  prevIcon: JSX.Element
}
const AvatarUpload = memo(
  ({ setAvatarUrl, avatarUrl, prevIcon }: AvatarUploadProps) => {
    //отслеживаем загрузку фотки
    const [, setLoading] = useState(false)

    const handleChange: UploadProps['onChange'] = (
      info: UploadChangeParam<UploadFile>,
    ) => {
      if (info.file.status === 'uploading') {
        setLoading(true)
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as RcFile, url => {
          setLoading(false)

          if (
            info.file.size < 2097152 &&
            (info.file.type === 'image/jpeg' || info.file.type === 'image/png')
          ) {
            //если файл меньше 2мб загружаем
            setAvatarUrl(url)
            return
          }
        })
      }
    }

    return (
      <S.Cropper
        cropShape='round'
        modalOk='Применить'
        modalCancel='Отмена'
        modalWidth='43.2rem'
        maxZoom={4}
        modalProps={modalProps}
        cropperProps={cropperProps}
        beforeCrop={beforeUpload}
      >
        <S.Avatar
          name='avatar'
          listType='picture-circle'
          className='avatar-uploader'
          showUploadList={false}
          action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
          onChange={handleChange}
        >
          {avatarUrl ? <S.Image src={avatarUrl} alt='avatar' /> : prevIcon}
          <S.MiniIconContainer>
            <Icon icon='camera' />
          </S.MiniIconContainer>
        </S.Avatar>
      </S.Cropper>
    )
  },
)

AvatarUpload.displayName = 'AvatarUpload'

export default AvatarUpload
