import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { InternalNamePath } from 'antd/es/form/interface'

export type MessageType = 'warning' | 'success'

export type HandleFinishFailedProps = {
  errorFields: {
    name: InternalNamePath
    errors: string[]
  }[]
}

export type CustomError = {
  data: { reason: string; statusCode: number; statusMessage: string }
  status: number
}

export type ToPrepareErrorTextArgs =
  | FetchBaseQueryError
  | SerializedError
  | CustomError
