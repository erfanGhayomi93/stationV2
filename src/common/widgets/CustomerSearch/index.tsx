import { BodyScrollEvent } from 'ag-grid-community';
import clsx from 'clsx';
import { useState, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerListInfinit } from 'src/app/queries';
import AGTable from 'src/common/components/AGTable';
import Input from 'src/common/components/Input';
import WidgetLoading from 'src/common/components/WidgetLoading';
import useDebounce from 'src/common/hooks/useDebounce';
import { MoreDotsIcon, PortfolioDetailIcon, Search } from 'src/common/icons';

const CustomerSearch = () => {
    const [params, setParams] = useState<IGoCustomerRequest>({ type: 'Customer' });
    const debouncedParams = useDebounce(params, 500);
    const { t } = useTranslation();

    const { data: data, isLoading: isSearchLoading, hasNextPage, fetchNextPage } = useCustomerListInfinit(debouncedParams);

    const actionCellRenderer = ({ data }: { data: IGoCustomerSearchResult }) => {
        console.log(data);
        return (
            <div className="flex items-center justify-center gap-2 py-2">
                <button className=" bg-[#C6D8E7] px-1.5 py-1 rounded-md">
                    <MoreDotsIcon className="text-[#135CA4]" />
                </button>
                <button className="">
                    <PortfolioDetailIcon className="text-[#135CA4]" />
                </button>
            </div>
        );
    };
    const nameCellRenderer = ({ data }: { data: IGoCustomerSearchResult }) => {
        return data.groupName ? <>{data.groupName}</> : <>{data.customerTitle}</>;
    };
    const [columnDefs] = useState([
        { field: 'customerTitle', headerName: 'نام', cellRenderer: nameCellRenderer },
        { field: 'balance', headerName: 'دارایی' },
        { field: 'customerTitle', headerName: 'عملیات', cellRenderer: actionCellRenderer },
    ]);

    const typeCounts = useMemo(() => data?.pages[data?.pages.length - 1].typeCounts, [data]);

    const onGridReady = (grid: BodyScrollEvent<any>) => {
        const itemsLength = data?.pages.flatMap((page) => page.searchResult.result).length;
        const rowIndex = grid.api.getLastDisplayedRow() + 1;
        rowIndex === itemsLength && fetchNextPage();
    };

    //
    return (
        <div className="w-full h-full grid gap-2 grid-rows-min-one overflow-y-auto">
            <Input
                placeholder="جستجوی مشتری"
                addonBefore={<Search className="text-gray-400" />}
                onChange={(e) => setParams((prev) => ({ ...prev, term: e.target.value }))}
            />
            <WidgetLoading spining={isSearchLoading}>
                <div className="bg-white h-full rounded py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                    <div className="flex gap-2  py-2">
                        {typeCounts?.map((type) => (
                            <>
                                <button
                                    onClick={() => setParams((prev) => ({ ...prev, type: type.type }))}
                                    disabled={!type.count}
                                    className={clsx(
                                        'bg-[#E2EBF3]  disabled:opacity-60 relative text-[#566978] border-solid border-transparent border px-2 py-1 rounded-md',
                                    )}
                                >
                                    <CounterBalloon count={type.count} />
                                    {t('CustomerTypes.' + type.type)}
                                </button>
                            </>
                        ))}
                        <button className="bg-[#E2EBF3] text-[#566978] border-solid border-transparent border px-2 py-1 rounded-md">
                            همه انتخاب شده‌ها
                        </button>
                    </div>
                    <AGTable
                        rowData={data?.pages.flatMap((page) => page.searchResult.result) || []}
                        columnDefs={columnDefs}
                        onBodyScrollEnd={onGridReady}
                    />
                </div>
            </WidgetLoading>
        </div>
    );
};

export default CustomerSearch;

interface ICounterBalloonType {
    count: number;
}
const CounterBalloon: FC<ICounterBalloonType> = ({ count }) => {
    return (
        <span
            className={clsx(
                'absolute text-[10px] bg-L-menu-20  -top-3 -left-2 rounded-full flex justify-center text-white items-center leading-none pt-0.5 w-5 h-5 duration-200',
                !!count ? '' : 'scale-0',
            )}
        >
            {count > 99 ? '99+' : count}
        </span>
    );
};
