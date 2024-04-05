import { Header as AntdHeader } from 'antd/es/layout/layout'
import { Badge } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { getColor } from '@/app/styles/Theme'

export const Header = styled(AntdHeader)`
  display: sticky;
  height: 96px;
  border-bottom: 1px solid ${getColor('neutral_4')};
  background-color: ${getColor('white_primary')};
  padding: 24px 32px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const Title = styled.h1`
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 38.4px */
  letter-spacing: -0.64px;

  color: ${getColor('text_1')};
`
export const Container = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export const NotificationBg = styled.div`
  height: 40px;
  width: 40px;
  background-color: ${getColor('bg_150')};
  transition: background-color 0.2s;

  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    stroke: ${getColor('accent_1')};
    cursor: pointer;
  }

  &:hover {
    background-color: ${getColor('accent_5')};
  }
  position: relative;
`

export const KnowledgeBg = styled.div`
  height: 32px;
  width: 32px;
  background-color: ${getColor('accent_7')};
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    transition: stroke 0.2s;

    stroke: ${getColor('accent_1')};
  }

  transition: background-color 0.2s;
`

export const Knowledge = styled.a`
  display: flex;
  gap: 12px;
  align-items: center;

  padding: 8px 16px;

  cursor: pointer;

  &:hover ${KnowledgeBg} {
    background-color: ${getColor('accent_1')};
    & svg {
      stroke: ${getColor('white_primary')};
    }
  }
`

export const KnowledgeHeading = styled.h3`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  color: ${getColor('text_1')};
`

export const ImageContainer = styled(Link)`
  width: 4rem;
  height: 4rem;
`

export const CustomBadge = styled(Badge)`
  right: 32%;
  top: 30%;
  position: absolute;
  cursor: pointer;
`
