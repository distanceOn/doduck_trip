import { useEffect } from 'react'
import { useMessageActions } from '..'
import { message } from 'antd'

import { MessageContent } from '@/entities/message/ui/MessageContent'
import { useAppSelector } from '@/shared/model/reduxHooks'

const useMessageApi = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { messageType, text } = useAppSelector(state => state.message)
  const { resetMessage } = useMessageActions()

  useEffect(() => {
    // если сообщение пустое, то не выводим его
    if (!text || text.length === 0) return

    messageApi.open({
      type: messageType,
      content: <MessageContent type={messageType} content={text} />,
      duration: 4,
      style: {
        textAlign: 'right',
      },
    })

    resetMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageType, text])

  return { contextHolder }
}

export default useMessageApi
