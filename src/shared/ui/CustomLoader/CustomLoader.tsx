import { memo } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import type { SpinSize } from 'antd/es/spin'

import * as S from './style'
export const CustomLoader = memo(({ size }: { size: SpinSize }) =>
  size === 'large' ? (
    <S.Container>
      <S.CustomSpin size={size} indicator={<LoadingOutlined spin />} />
    </S.Container>
  ) : (
    <S.CustomSpin size={size} indicator={<LoadingOutlined spin />} />
  ),
)

CustomLoader.displayName = 'CustomLoader'
