import { ChevronIcon } from 'src/common/icons';

export function Paginator({ current, onChange, total, loading, hasNextPage, hasPreviousPage }: IPaginatorType) {
    const currentPage = current || 1;

    const handleChangePage = (index: number) => {
        onChange && onChange(index);
    };
    return (
        <div className="flex text-1.2 text-L-basic gap-1">
            <button
                title="بعدی"
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={(hasNextPage !== undefined ? !hasNextPage : currentPage === total) || loading}
                className="w-[32px] h-[32px] disabled:opacity-30 flex items-center justify-center border rounded-md border-L-primary-50 text-L-primary-50 "
            >
                <ChevronIcon width={12} height={12} className="rotate-90 " />
            </button>
            <div className="flex h-[32px] bg-L-primary-50 items-center px-2 rounded-md">
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
                title="قیلی"
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={(hasPreviousPage !== undefined ? !hasPreviousPage : currentPage === 1) || loading}
                className="w-[32px] h-[32px] flex disabled:opacity-30 items-center justify-center border rounded-md border-L-primary-50 text-L-primary-50 "
            >
                <ChevronIcon width={12} height={12} className="-rotate-90" />
            </button>
        </div>
    );
}
interface IPaginatorType {
    total?: number;
    current: number;
    loading?: boolean;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    onChange: (index: number) => void;
}
