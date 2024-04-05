import type {
  CustomError,
  ToPrepareErrorTextArgs,
} from '@/entities/message/model/types'

// Type guard для проверки, является ли ошибка CustomError
function isCustomError(error: ToPrepareErrorTextArgs): error is CustomError {
  return (error as CustomError).data !== undefined
}

export const toPrepareErrorText = (error: ToPrepareErrorTextArgs): string[] => {
  if (isCustomError(error)) {
    if (error.data.statusCode === 500) {
      return ['Ошибка сервера', 'Пожалуйста, повторите операцию позже']
    }
    return ['Ошибка сервера', error.data.reason]
  } else {
    return ['Ошибка сервера', 'Пожалуйста, повторите операцию позже']
  }
}
