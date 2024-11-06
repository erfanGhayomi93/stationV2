import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

type ButtonProps = {
     variant?: 'primary' | 'primary-outline' | 'secondary' | 'danger' | 'danger-outline' | 'label';
     className?: string;
     icon?: ReactNode;
     isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Loading = () => {
     return (
          <svg
               className="animate-spin text-icon-white/20"
               viewBox="0 0 64 64"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
          >
               <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
               ></path>
               <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="text-icon-white"
               ></path>
          </svg>
     );
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
     ({ children, variant = 'primary', icon, className, isLoading = false, ...props }, ref) => {
          const baseClass =
               'py-2 px-6 rounded-lg text-sm border flex items-center justify-center gap-x-2 disabled:text-button-disable-disable';

          const variantClass = clsx(isLoading && 'opacity-80 pointer-events-none', {
               'text-content-white bg-button-success-default border:content-success-buy': variant === 'primary',
               'text-content-success-buy bg-content-white border:content-success-buy': variant === 'primary-outline',
               'text-content-white bg-button-error-default': variant === 'danger',
               'text-content-error-sell bg-back-error-default': variant === 'danger-outline',
               'text-content-deselecttab bg-button-tab-deactive': variant === 'secondary',
               'text-content-selected bg-button-tab-active  border-none': variant === 'label',
          });

          return (
               <button ref={ref} className={clsx(baseClass, variantClass, className)} {...props}>
                    {isLoading ? (
                         <Loading />
                    ) : (
                         <>
                              {!!icon && icon}
                              <span>{children}</span>
                         </>
                    )}
               </button>
          );
     }
);

Button.displayName = 'Button';

export default Button;
