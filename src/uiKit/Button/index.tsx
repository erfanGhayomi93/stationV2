import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

// Define the type for props, extending the default button props
type ButtonProps = {
     variant?: 'primary' | 'primary-outline' | 'secondary' | 'danger' | 'danger-outline' | 'label'; // Add custom props
     className?: string; // Optional extra className
     icon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>; // Include default button attributes

// Forward ref to the button component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, variant = 'primary', icon, className, ...props }, ref) => {
     const baseClass = 'py-2 px-6 rounded-lg text-sm border flex items-center justify-center gap-x-2';

     const variantClass = clsx({
          'text-content-white bg-button-success-default': variant === 'primary',
          'text-content-success-buy bg-content-white border:content-success-buy': variant === 'primary-outline',
          'text-content-white bg-button-error-default': variant === 'danger',
          'text-content-error-sell bg-back-error-default': variant === 'danger-outline',
          'text-content-deselecttab bg-button-tab-deactive': variant === 'secondary',
          'text-content-selected bg-button-tab-active': variant === 'label',
     });

     return (
          <button ref={ref} className={clsx(baseClass, variantClass, className)} {...props}>
               {!!icon && icon}
               <span>{children}</span>
          </button>
     );
});

Button.displayName = 'Button';

export default Button;
