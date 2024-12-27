export interface CartItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface DeliveryInfo {
    address: string;
    city: string;
    zipCode: string;
    phone: string;
    instructions?: string;
  }
  
  export interface PaymentInfo {
    method: 'credit-card' | 'cod' | 'bkash';
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    bkashNumber?: string;
  }