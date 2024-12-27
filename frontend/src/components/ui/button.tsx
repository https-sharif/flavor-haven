import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', to, children, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-300',
      {
        'bg-[#D4AF37] text-black hover:bg-[#B8960C]': variant === 'primary',
        'bg-black text-[#D4AF37] hover:bg-gray-900': variant === 'secondary',
        'border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black':
          variant === 'outline',
      },
      {
        'h-9 px-4 text-sm': size === 'sm',
        'h-11 px-6 text-base': size === 'md',
        'h-14 px-8 text-lg': size === 'lg',
      },
      className
    );

    if (to) {
      return (
        <Link to={to} className={baseStyles}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={baseStyles} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };