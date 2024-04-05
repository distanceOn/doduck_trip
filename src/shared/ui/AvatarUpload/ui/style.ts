import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import styled from 'styled-components'

import { getColor } from '@/app/styles/Theme'

export const MiniIconContainer = styled.div`
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.2s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    width: 29.777%;
    height: 27.039%;
    & path {
      fill: ${getColor('white_primary')};
    }
  }
`

export const Avatar = styled(Upload)`
  position: relative;
  border-radius: 50%;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;
  background-color: ${getColor('accent_5')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-out;
  & .ant-upload.ant-upload-select {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    border: none !important;
  }

  &:hover ${MiniIconContainer} {
    // черный цвет с прозрачностью 40%
    background-color: #00000066;
    opacity: 1;
  }
`

export const Image = styled.img`
  position: relative;
  z-index: 10;
  width: 100%;
`
export const UploadButton = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const IconContainer = styled.div`
  & svg {
    width: 5vw;
    height: 3.888vw;
  }
`

export const Cropper = styled(ImgCrop)``
