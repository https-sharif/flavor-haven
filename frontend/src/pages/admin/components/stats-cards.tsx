import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Users, Calendar, ShoppingBag, DollarSign } from 'lucide-react';

interface StatsCardsProps {
  totalOrders: number;
  totalReservations: number;
  totalCustomers: number;
  totalRevenue: number;
}

export function StatsCards({ totalOrders, totalReservations, totalCustomers, totalRevenue }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Reservations</CardTitle>
          <Calendar className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReservations}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Customers</CardTitle>
          <Users className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCustomers}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">&#2547; &nbsp;{totalRevenue.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  );
}