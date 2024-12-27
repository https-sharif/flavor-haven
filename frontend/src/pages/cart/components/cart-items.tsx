import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import type { CartItem } from '../../../types/cart';

interface CartItemsProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartItems({ items, onUpdateQuantity, onRemoveItem }: CartItemsProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-md"
          />
          
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-primary font-semibold mt-1">
                &#2547; {item.price}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-600"
            onClick={() => onRemoveItem(item.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}