export function useCurrency() {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })

  const formatCurrency = (value: number): string => formatter.format(value)

  return { formatCurrency }
}
