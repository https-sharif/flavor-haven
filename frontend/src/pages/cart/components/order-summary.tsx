import { Card } from '../../../components/ui/card';
import type { CartItem } from '../../../types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  deliveryFee: number;
}

export function OrderSummary({ items, deliveryFee }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.quantity}x {item.name}</span>
            <span>&#2547; {item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>&#2547; {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>&#2547; {deliveryFee}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>&#2547; {total}</span>
        </div>
      </div>
    </Card>
  );
}