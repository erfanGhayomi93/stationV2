import clsx from 'clsx';
import { ChevronIcon } from 'src/common/icons';

export function Paginator({ current, onChange, total, loading, pageSize = 25, hasNextPage, hasPreviousPage }: IPaginatorType) {
    const currentPage = current || 1;
    const pageSizes = [10, 25, 50, 100];

    const handleChangePage = (index: number) => {
        onChange && onChange(index);
    };
    return (
        <div className="flex w-full text-xs justify-between items-center">
            <div className="flex gap-1">
                {pageSizes.map((ps) => (
                    <button
                        key={ps}
                        className={clsx(
                            { 'bg-L-gray-500 text-L-basic dark:bg-D-gray-500 dark:text-D-basic': pageSize === ps },
                            { 'dark:text-D-gray-600': pageSize !== ps },
                            'rounded-md px-2 py-2',
                        )}
                    >
                        {ps}
                    </button>
                ))}
            </div>
            <div className="flex gap-1">
                <button
                    title="بعدی"
                    onClick={() => handleChangePage(currentPage + 1)}
                    disabled={(hasNextPage !== undefined ? !hasNextPage : currentPage === total) || loading}
                    className="w-[32px] h-[32px] disabled:opacity-30 flex items-center justify-center border rounded-md border-L-gray-600 text-L-gray-600 dark:text-D-gray-600 dark:border-D-gray-600"
                >
                    <ChevronIcon width={12} height={12} className="rotate-90 " />
                </button>
                <div className="flex h-[32px] items-center px-2 rounded-md border border-L-gray-600 dark:text-D-gray-600 dark:border-D-gray-600">
                    <span>صفحه :</span>
                    <div dir="ltr flex">
                        {total ? (
                            <>
                                <span>{total}</span>/
                            </>
                        ) : (
                            <></>
                        )}
                        <span>{currentPage}</span>
                    </div>
                </div>
                <button
                    title="قبلی"
                    onClick={() => handleChangePage(currentPage - 1)}
                    disabled={(hasPreviousPage !== undefined ? !hasPreviousPage : currentPage === 1) || loading}
                    className="w-[32px] h-[32px] flex disabled:opacity-30 items-center justify-center border rounded-md border-L-gray-600 text-L-gray-600 dark:text-D-gray-600 dark:border-D-gray-600 "
                >
                    <ChevronIcon width={12} height={12} className="-rotate-90" />
                </button>
            </div>
        </div>
    );
}
interface IPaginatorType {
    total?: number;
    current: number;
    pageSize?: number;
    loading?: boolean;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    onChange: (index: number) => void;
}
