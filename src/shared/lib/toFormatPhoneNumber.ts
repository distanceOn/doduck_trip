export const toFormatPhoneNumber = (value: string) => {
  if (!value) {
    return value
  }

  const phoneNumber = value.toString().replace(/\D/g, '')

  let formattedNumber =
    phoneNumber.startsWith('7') || phoneNumber.startsWith('8')
      ? '+7'
      : '+7' + phoneNumber

  if (phoneNumber.length >= 2) {
    formattedNumber += ` ${phoneNumber.substring(1, 4)}`
  }

  if (phoneNumber.length >= 5) {
    formattedNumber += ` ${phoneNumber.substring(4, 7)}`
  }

  if (phoneNumber.length >= 8) {
    formattedNumber += ` ${phoneNumber.substring(7, 9)}`
  }

  if (phoneNumber.length >= 10) {
    formattedNumber += ` ${phoneNumber.substring(9)}`
  }

  return formattedNumber
}
