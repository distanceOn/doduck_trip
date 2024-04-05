import { createGlobalStyle } from 'styled-components'

import InterRegular from './fonts/Inter/Inter-Regular.ttf'

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Inter';
        src: url(${InterRegular}) format('ttf'),
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        font-size: 62.5%;
        font-style: normal;
        font-weight: 400;
    }
    *:before,
    *:after {
        box-sizing: border-box;
    }
    a,
    a:visited {
        text-decoration: none;
        cursor: pointer;
    }
    button {
        cursor: pointer;
    }
    ul li {
        list-style: none;
    }
    input,
    button,
    textarea,
    select {
        font: inherit;
    }
    h1, h2, h3, h4, h5, h6, p {
        all: unset;
    }
    body {
        width: 100%;
        height: 100%;
        font-family: 'Inter', sans-serif;
        overflow-y: hidden;
    }
    // убираем bg после автозаполнения инпута
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
    -webkit-background-clip: text;
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px transparent;
    }

`
