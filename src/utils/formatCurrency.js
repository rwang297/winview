export function formatCurrency(n) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(Number(n || 0));
  } catch (_) {
    return `₦${Number(n || 0).toLocaleString()}`;
  }
}
