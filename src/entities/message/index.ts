import useMessageActions from './hooks/useMessageActions'
import useMessageApi from './hooks/useMessageApi'

import { messageReducer } from './model/messageSlice'
export { useMessageActions, useMessageApi }

export default messageReducer
