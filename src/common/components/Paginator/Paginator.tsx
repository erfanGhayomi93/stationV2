import clsx from 'clsx';
import { ChevronIcon } from 'src/common/icons';

interface IPaginatorType {
    totalPages?: number;
    pageNumber: number;
    pageSize: number;
    loading?: boolean;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    PaginatorHandler: (action: 'PageSize' | 'PageNumber', value: number) => void;
}

export function Paginator({ totalPages, pageNumber, loading, pageSize, hasNextPage, hasPreviousPage, PaginatorHandler }: IPaginatorType) {
    //
    const pageSizes = [10, 25, 50, 100];

    return (
        <div className="flex w-full text-xs justify-between items-center">
            <div className="flex gap-1">
                {pageSizes.map((ps) => (
                    <button
                        onClick={() => PaginatorHandler('PageSize', ps)}
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
                    onClick={() => PaginatorHandler('PageNumber', pageNumber + 1)}
                    disabled={(hasNextPage !== undefined ? !hasNextPage : pageNumber === totalPages) || loading}
                    className="w-[32px] h-[32px] disabled:opacity-30 flex items-center justify-center border rounded-md border-L-gray-600 text-L-gray-600 dark:text-D-gray-600 dark:border-D-gray-600"
                >
                    <ChevronIcon width={12} height={12} className="rotate-90 " />
                </button>
                <div className="flex h-[32px] items-center px-2 rounded-md border border-L-gray-600 dark:text-D-gray-600 dark:border-D-gray-600">
                    <span>صفحه :</span>
                    <div dir="ltr flex">
                        {totalPages ? (
                            <>
                                <span>{totalPages}</span>/
                            </>
                        ) : (
                            <></>
                        )}
                        <span>{pageNumber}</span>
                    </div>
                </div>
                <button
                    title="قبلی"
                    onClick={() => PaginatorHandler('PageNumber', pageNumber - 1)}
                    disabled={(hasPreviousPage !== undefined ? !hasPreviousPage : pageNumber === 1) || loading}
                    className="w-[32px] h-[32px] flex disabled:opacity-30 items-center justify-center border rounded-md border-L-gray-600 text-L-gray-600 dark:text-D-gray-600 dark:border-D-gray-600 "
                >
                    <ChevronIcon width={12} height={12} className="-rotate-90" />
                </button>
            </div>
        </div>
    );
}
