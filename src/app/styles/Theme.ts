import type { DefaultTheme } from 'styled-components'

export const Theme = {
  white_primary: '#ffffff',

  accent_0: '#0060C7',
  accent_1: '#0D82FF',
  accent_5: '#E5F2FF',
  accent_6: '#004C9E',
  accent_7: '#eff6fe',

  neutral_1: '#f1f2f4',
  neutral_2: '#5A7494',
  neutral_3: '#A7AFB6',
  neutral_4: '#D5D7DC',

  success: '#18AF1E',
  error: '#DA4052',

  text_1: '#0A0A0A',
  text_2: '#39475B',
  text_3: '#111924',

  bg_100: '#F8F8FA',
  bg_150: '#F0F0F4',
  bg_200: '#E4E9F4',

  green_100: '#D4F8D3',
  red_100: '#FBE7E9',
}

type ColorKey = keyof typeof Theme

type GetColor = (colorName: ColorKey) => ({ theme }: DefaultTheme) => string

export const getColor: GetColor =
  colorName =>
  ({ theme }) =>
    theme[colorName]
