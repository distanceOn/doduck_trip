import Form from 'antd/es/form/Form'
import styled from 'styled-components'

export const StyledForm = styled(Form)`
  width: 100%;
  max-width: 320px; // Начальная ширина для мобильных
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    max-width: 500px; // Увеличение ширины для планшетов/десктопов
  }
`
