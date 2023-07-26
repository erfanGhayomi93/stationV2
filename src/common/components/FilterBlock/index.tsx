import clsx from "clsx";

const FilterBlock = ({ children, label, className }: any) => {
    return (
        <div className={clsx('flex gap-2 items-center grow col-span-2', className)}>
            <span className="text-xs pr-0.5 text-L-gray-500 dark:text-D-gray-700">{label}:</span>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default FilterBlock