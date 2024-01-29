import clsx from 'clsx';

const FilterBlock = ({
    children,
    label,
    className,
    viewCol = false,
}: {
    children?: React.ReactNode;
    label?: string;
    className?: string;
    viewCol?: boolean;
}) => {
    return (
        <div className={clsx('flex gap-2 col-span-2', { [className as string]: !!className }, viewCol ? 'flex-col' : 'items-center')}>
            <span className="text-xs pr-0.5 text-L-gray-600 dark:text-D-gray-700 whitespace-nowrap">{label}:</span>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default FilterBlock;
