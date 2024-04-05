import { Input } from 'antd'

import type { InputProps } from '@/shared/model/types'

import * as S from './style'
import { Icon } from '@/shared/ui'
const AntInput = ({
  name,
  type,
  allowClear,
  placeholder,
  showPassword,
  setShowPassword,
}: InputProps) => {
  const clearIcon = { clearIcon: <S.CleanInputIcon /> }

  const getIconRender = (visible: boolean) => {
    const icon = visible ? 'closedEye' : 'openedEye'
    return (
      <S.EyeBox>
        <Icon icon={icon} />
      </S.EyeBox>
    )
  }

  const visibilityToggle = {
    visible: showPassword,
    onVisibleChange: () => setShowPassword(!showPassword),
  }

  if (type === 'password') {
    return (
      <Input.Password
        name={name}
        type={type}
        placeholder={placeholder}
        iconRender={visible => getIconRender(visible)}
        visibilityToggle={visibilityToggle}
      />
    )
  }

  return (
    <Input
      name={name}
      type={type}
      allowClear={allowClear && clearIcon}
      placeholder={placeholder}
    />
  )
}

export default AntInput
