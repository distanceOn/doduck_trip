import { memo } from 'react'

import Icon from './Icon'

import * as S from './style'

const AvatarIcon = memo(({ img }: { img: string }) =>
  img ? (
    <S.Img preview={false} src={img} alt='avatar' />
  ) : (
    <S.IconBox>
      <Icon icon='defaultCircle' />
    </S.IconBox>
  ),
)

AvatarIcon.displayName = 'AvatarIcon'

export default AvatarIcon
