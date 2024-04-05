import { createGlobalStyle } from 'styled-components'

import { getColor } from './Theme'

export const AntdStyles = createGlobalStyle`
// стилизация Message для ошибок форм
.ant-message-notice-content {
    width: 24.86vw;
    box-sizing: border-box;
    .ant-message-custom-content{
        display: flex;

        & span {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
}

// стилизация слайдера в кроппере
.img-crop-control{
    margin: 0 !important;
    width: 100% ;
    button {
        color: ${getColor('neutral_3')};
    }
    .ant-slider:hover{
        .ant-slider-track, .ant-slider-rail {
            background-color: ${getColor('neutral_3')};
    }
        .ant-slider-handle::after{
            box-shadow: 0 0 0 2px ${getColor('neutral_3')};
    }
    }  
    .ant-slider-track, .ant-slider-rail {
        background-color: ${getColor('neutral_3')};
    }
    .ant-slider-handle{
        &::after{
            box-shadow: 0 0 0 2px ${getColor('neutral_3')};
        }
        &:focus::after, &:hover::after{
            box-shadow: 0 0 0 4px ${getColor('neutral_3')};
        }
    }
}


`
