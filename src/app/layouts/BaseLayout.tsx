import { AppRouter } from '@/app/routes/AppRouter'
import { useMessageApi } from '@/entities/message'

const BaseLayout = () => {
  const { contextHolder } = useMessageApi()

  return (
    <>
      <AppRouter />
      {contextHolder}
    </>
  )
}

export default BaseLayout
