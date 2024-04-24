export function PhoneMask(text: string) {
  const num = text.replace(/[^0-9]/g, '');
  const len = num.length;

  const format = () => {
    if (len < 1 && len <= 5) {
      return num.replace(/(\d{1,2})/, '($1) ')
    }
    if (len <= 7) {
      return num.replace(/(\d{2})(\d{1,4})/, '($1) $2')
    }
    if (len <= 10) {
      return num.replace(/(\d{2})(\d{1,4})(\d{1,4})/g, '($1) $2-$3')
    } if (len >= 11) {
      return num.replace(/(\d{2})(\d{1,5})(\d{1,4})/g, '($1) $2-$3')
    }
    return num.replace(/(\d{2})(\d{1,5})(\d{1,4})/g, '($1) $2-$3')
  }
  
  return format()
}