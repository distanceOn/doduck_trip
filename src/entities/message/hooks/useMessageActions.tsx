import { useCallback } from 'react'
import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import type { HandleFinishFailedProps } from '@/entities/message/model/types'

import { toPrepareErrorText } from '@/entities/message/lib/toPrepareErrorText'
import {
  resetMessageText,
  setMessage,
} from '@/entities/message/model/messageSlice'
import { useAppDispatch } from '@/shared/model/reduxHooks'

const useMessageActions = () => {
  const dispatch = useAppDispatch()

  const handleFinishFailed = useCallback(
    ({ errorFields }: HandleFinishFailedProps) => {
      errorFields.forEach(element => {
        const text = element.errors[0]

        const splitedErrors = text.split('&')

        dispatch(setMessage({ text: splitedErrors, messageType: 'warning' }))
      })
    },
    [dispatch],
  )

  const showServerError = useCallback(
    ({
      serverError,
    }: {
      serverError: FetchBaseQueryError | SerializedError | Error
    }) => {
      const content = toPrepareErrorText(serverError)
      dispatch(setMessage({ text: content, messageType: 'warning' }))
    },
    [dispatch],
  )

  const showSuccess = useCallback(
    ({ content }: { content: string | string[] }) => {
      //сообщение об успехе
      dispatch(setMessage({ text: content, messageType: 'success' }))
    },
    [dispatch],
  )

  const showCustomError = useCallback(
    ({ content }: { content: string | string[] }) => {
      dispatch(setMessage({ text: content, messageType: 'warning' }))
    },
    [dispatch],
  )

  const resetMessage = useCallback(() => {
    dispatch(resetMessageText())
  }, [dispatch])
  return {
    handleFinishFailed,
    showServerError,
    showSuccess,
    showCustomError,
    resetMessage,
  }
}

export default useMessageActions
