import clsx from 'clsx';

const FilterBlock = ({ children, label, className }: { children?: React.ReactNode; label?: string; className?: string }) => {
    return (
        <div className={clsx('flex gap-2 items-center grow col-span-2', { [className as string]: !!className })}>
            <span className="text-xs pr-0.5 text-L-gray-600 dark:text-D-gray-700">{label}:</span>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default FilterBlock;
