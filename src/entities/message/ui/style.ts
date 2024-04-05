import styled from 'styled-components'

import type { MessageType } from '@/entities/message/model/types'

import { getColor } from '@/app/styles/Theme'

type $Type = {
  $type: MessageType
}

export const Title = styled.h2<$Type>`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  color: ${({ $type }) =>
    $type === 'warning' ? getColor('error') : getColor('success')};
  text-align: left;
`
export const Text = styled.h2<$Type>`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  color: ${({ $type }) =>
    $type === 'warning' ? getColor('error') : getColor('success')};
  text-align: left;
`
