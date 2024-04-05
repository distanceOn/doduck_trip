import { Button, Image } from 'antd'
import styled from 'styled-components'

import { getColor } from '@/app/styles/Theme'

export const Img = styled(Image)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 50%;
`

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  cursor: pointer;

  & svg {
    width: 100%;
    height: 100%;
  }
`

export const Social = styled.svg`
  width: 2.22vw;
  height: 2.22vw;
`

export const Container = styled(Button)`
  width: 8.61vw;
  height: 3.33vw;
  border-radius: 0.56vw;
  border: 1px solid ${getColor('neutral_1')};
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`
