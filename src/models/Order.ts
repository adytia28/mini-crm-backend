export interface Order {
  id: string;
  customer_id: string;
  items: string[];
  price:number;
  qty:number;
  total_price: number;
  created_at:string;
}