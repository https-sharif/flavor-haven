export interface User {
  userId: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  photoURL: string;
  role: 'admin' | 'customer';
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  available: boolean;
  eta: number;
}

export interface Reservation {
  id: string;
  userId: string;
  date: Date;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: string;
    quantity: number;
    name: string;
    price: number;
    eta: number;
    notes?: string;
  }>;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  total: number;
  createdAt: Date;
  estimatedDeliveryTime?: string;
}

export interface FetchedOrders {
  userId: string;
  name: string;
  id: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  total: number;
  createdAt: Date;
  estimatedDeliveryTime: number;
}