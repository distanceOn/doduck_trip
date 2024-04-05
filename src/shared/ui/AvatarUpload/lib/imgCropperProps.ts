import type { ModalProps } from 'antd'

export const modalProps: ModalProps = {
  closeIcon: null,
  centered: true,
  okButtonProps: {
    style: {
      width: '100%',
    },
  },
  cancelButtonProps: {
    style: {
      width: '100%',
    },
  },
  styles: {
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5.6rem',
      borderRadius: '2.4rem',
      gap: '4rem',
    },
    header: {
      display: 'none',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.6rem',
    },
    footer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '1.2rem',
      margin: 0,
    },
  },
}

export const cropperProps = {
  style: {
    containerStyle: {
      width: '32rem',
      height: '28rem',
    },
  },
  restrictPosition: false,
  mediaProps: {
    /* your media props here */
  },
  zoomSpeed: 3,
}
