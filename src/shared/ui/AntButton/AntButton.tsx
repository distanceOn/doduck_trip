import { Button } from 'antd'

const AntButton = ({
  children,
  type,
  htmlType,
  block,
  size,
}: {
  children: string
  type: 'primary'
  htmlType: 'submit'
  block?: boolean
  size?: 'middle' | 'small' | 'large'
}) => (
  <Button htmlType={htmlType} block={block} type={type} size={size}>
    {children}
  </Button>
)

export default AntButton
