import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled' | 'confirmed';
}

export function Badge({ className, variant = 'pending', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          'bg-yellow-100 text-yellow-800': variant === 'pending',
          'bg-blue-100 text-blue-800': variant === 'preparing',
          'bg-green-100 text-green-800': variant === 'ready',
          'bg-gray-100 text-gray-800': variant === 'delivered',
          'bg-red-100 text-red-800': variant === 'cancelled',
          'bg-purple-100 text-purple-800': variant === 'confirmed',
        },
        className
      )}
      {...props}
    />
  );
}