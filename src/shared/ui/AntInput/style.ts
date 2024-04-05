import { CloseCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { getColor } from '@/app/styles/Theme'

export const CleanInputIcon = styled(CloseCircleOutlined)`
  height: 100%;
  width: 16px;

  position: absolute;
  top: 0;
  right: 16px;

  box-sizing: border-box;

  transition: opacity 0.3s;
  opacity: 0;
  & svg {
    width: 100%;
    height: 100%;

    fill: ${getColor('neutral_4')};
    cursor: pointer;
    transition: fill 0.2s;

    &:hover {
      fill: ${getColor('accent_1')};
    }
  }
`

export const EyeBox = styled.div`
  height: 24px;
  width: 24px;

  position: absolute;
  top: 17px;
  right: 12px;

  & svg {
    width: 100%;
    height: 100%;

    stroke: ${getColor('neutral_4')};
    cursor: pointer;
    transition: stroke 0.2s;

    &:hover {
      stroke: ${getColor('accent_1')};
    }
  }
`
