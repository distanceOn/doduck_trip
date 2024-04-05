import { Spin } from 'antd'
import styled from 'styled-components'

import { getColor } from '@/app/styles/Theme'
export const Container = styled.div`
  height: 100vh;
`

export const CustomSpin = styled(Spin)`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${getColor('white_primary')};
`
