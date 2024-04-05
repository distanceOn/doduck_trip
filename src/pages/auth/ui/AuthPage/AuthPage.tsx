import * as S from './style'
import { LoginForm, RegisterForm } from '@/widgets/auth'

type AuthPageProps = {
  type: 'login' | 'register'
}

export const AuthPage = ({ type }: AuthPageProps) => (
  <S.Page>{type === 'login' ? <LoginForm /> : <RegisterForm />}</S.Page>
)
