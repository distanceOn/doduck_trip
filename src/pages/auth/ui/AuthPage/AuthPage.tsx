import * as S from './style'
import { useAppSelector } from '@/shared/model/reduxHooks'
import { LoginForm, RegisterForm } from '@/widgets/auth'

export const AuthPage = () => {
  const { type } = useAppSelector(state => state.auth)

  return <S.Page>{type === 'login' ? <LoginForm /> : <RegisterForm />}</S.Page>
}
