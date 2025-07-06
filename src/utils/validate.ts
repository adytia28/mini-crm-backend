export function isValidCustomer(data: any): boolean {
  return data.name && data.email && data.phone && data.phone.length > 8;
}

export function isValidOrder(data: any): boolean {
  return data.customer_id && Array.isArray(data.items) && typeof data.total_price === 'number';
}
