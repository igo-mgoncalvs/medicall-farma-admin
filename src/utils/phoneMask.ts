export function PhoneMask(text: string) {
  const num = text.replace(/[^0-9]/g, '').replace(/^55/, '')
  const len = num.length;

  const format = () => {
    if (len === 0) return '+55 ';
    if (len < 3) return `+55 ${num}`;
    if (len < 8) return `+55 (${num.slice(0, 2)}) ${num.slice(2)}`;
    if (len <= 11) {
      return `+55 (${num.slice(0, 2)}) ${num.slice(2, 7)}-${num.slice(7)}`;
    }
    return `+55 (${num.slice(0, 2)}) ${num.slice(2, 7)}-${num.slice(7, 11)}`;
  };

  return format();
}
