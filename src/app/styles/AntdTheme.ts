import { Theme } from './Theme'

export const AntdTheme = {
  token: {
    fontFamily: 'Inter, sans-serif',
    colorPrimary: Theme.accent_1,

    colorError: Theme.error,
  },
  components: {
    Button: {
      defaultColor: Theme.accent_1, // color у default btn
      defaultBorderColor: Theme.accent_1, // цвет border у default btn
      colorPrimaryHover: Theme.accent_0, // цвет кнопки при наведении
      colorPrimaryActive: Theme.accent_6, // цвет кнопки при нажатии

      borderRadius: 12, // y size middle btn
      borderRadiusLG: 12, // у size large btn
      borderRadiusSM: 8, // у size large btn

      controlHeightLG: 58, // large height btn
      controlHeight: 48, // middle height btn
      controlHeightSM: 34, // middle height btn
      contentFontSize: 16, // 16px font-size у size middle btn
      contentFontSizeLG: 16, // 16px font-size у size large btn
      contentFontSizeSM: 14, // 14px font-size у size small btn

      defaultBg: 'transparent', // bg default btn

      borderColorDisabled: Theme.neutral_4, // border color btn disabled
      colorBgContainerDisabled: Theme.neutral_4, // bg color btn disabled
      colorTextDisabled: Theme.white_primary, // color btn disabled

      colorErrorBg: 'rgba(162, 43, 57, 0.161)', // hover bg danger text btn
      colorErrorHover: '#A22B39', // hover color danger btn
      colorErrorBorderHover: '#A22B39', // hover border color danger btn
    },

    Input: {
      hoverBorderColor: Theme.accent_1, // цвет бордера инпута при наведении
      colorBorder: Theme.neutral_4, // цвет бордера инпута
    },
    Message: {
      contentPadding: 16, // внутренний отступ
      colorWarning: Theme.error, // цвет у иконки при вызове message.warning
      colorSuccess: Theme.success, // цвет у иконки при вызове message.success
    },
    Table: {
      bodySortBg: Theme.bg_100, // цвет bg столбца с сортировкой
      borderColor: Theme.bg_100, // цвет рамки
      colorBgContainer: Theme.bg_100, // цвет bg таблицы

      headerBg: Theme.bg_100, // цвет bg хэдера
      headerColor: Theme.neutral_2, // цвет текста хэдера
      headerSortActiveBg: Theme.bg_100, // убираю изменение цвета хэдера при наличии сортировки у столбца - если сортировка активна
      headerSortHoverBg: Theme.bg_100, // убираю изменение цвета хэдера при наличии сортировки у столбца - при наведении на него
      cellFontSize: 16, // font-size текста в таблице
      fontWeightStrong: 400, // font-weight текста в таблице
      colorText: Theme.text_1, // цвет текста в таблице
      headerBorderRadius: 24, // border-radius у header
    },
    Dropdown: {
      borderRadiusLG: 12,

      paddingXXS: 12,
      controlPaddingHorizontal: 16,
      fontSize: 14,
    },
    Checkbox: {
      colorPrimaryHover: Theme.accent_0, // цвет при наведении
      colorPrimaryActive: Theme.accent_6, // цвет при нажатии
    },
    Select: {
      controlHeightLG: 58, // высота size large
      borderRadiusLG: 12, // border radius size large

      optionSelectedBg: Theme.bg_200, // bg у выбранного айтема в options
      optionPadding: '12px 16px', // padding у айтема в options
      paddingXXS: 0, // padding у options box
      borderRadiusSM: 0, // border radius у айтема в options
      colorBorder: Theme.neutral_4, // цвет border
      boxShadowSecondary: '-22px 33px 132px 0px rgba(225, 225, 235, 0.67)', // box-shadow дропдауна
      optionActiveBg: Theme.bg_200, // hover эффект айтема в options
      paddingSM: 16, // горизонтальный пэддинг у активного селекта
      optionFontSize: 16, // font-size у item в options
    },
    Spin: {
      dotSizeLG: 60,
      dotSize: 40,
    },
  },
}
