import type { MessageType } from '@/entities/message/model/types'

import * as S from './style'

type ErrorMessageContent = ({
  content,
  type,
}: {
  content: string[] | string
  type: MessageType
}) => JSX.Element

export const MessageContent: ErrorMessageContent = ({ content, type }) =>
  Array.isArray(content) ? (
    <>
      <S.Title $type={type}>{content[0]}</S.Title>
      <S.Text $type={type}>{content[1]}</S.Text>
    </>
  ) : (
    <S.Title $type={type}>{content}</S.Title>
  )
