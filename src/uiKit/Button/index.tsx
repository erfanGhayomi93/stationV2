import { forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

// Define the type for props, extending the default button props
type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'danger';  // Add custom props
    className?: string;  // Optional extra className
} & ButtonHTMLAttributes<HTMLButtonElement>; // Include default button attributes

// Forward ref to the button component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', className, ...props }, ref) => {

        const baseClass = 'py-2 px-6 rounded-lg text-sm';

        const variantClass = clsx({
            'text-content-success-buy bg-back-primary-container': variant === 'primary',
            'text-content-error-sell bg-back-error-container': variant === 'danger',
            'text-content-deselecttab bg-button-tab-deactive': variant === 'secondary',
        });

        return (
            <button
                ref={ref}
                className={clsx(baseClass, variantClass, className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);


Button.displayName = 'Button';

export default Button;
