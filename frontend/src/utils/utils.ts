export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID').format(value);
