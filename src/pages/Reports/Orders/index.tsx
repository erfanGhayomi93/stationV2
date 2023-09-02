import Tippy from '@tippyjs/react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';
import { useState, useEffect, useCallback } from 'react';
import OrdersFilter from './components/OrderFilter';
import OrdersTable from './components/OrderTable';
import { useTranslation } from 'react-i18next';
import { useOrderLists } from 'src/app/queries/order';
import { initialState } from './constant';

export interface OrdersFilterTypes {
    customers: IGoCustomerSearchResult[];
    symbols: SymbolSearchResult[];
    fromDate: string;
    toDate: string;
    side: string;
    customerType: string;
    status: string[]
}

const Orders = () => {
    //
    const { t } = useTranslation()
    const [params, setParams] = useState<IOrdersListStateType>(initialState)
    const { PageNumber, PageSize } = params;

    const {
        data: ordersList,
        refetch: getOrdersList,
        isFetching,
    } = useOrderLists(
        {
            ...params,
            SymbolISIN: params.SymbolISIN.map(({ symbolISIN }) => symbolISIN),
            CustomerISIN: params.CustomerISIN.map(({ customerISIN }) => customerISIN),
        });

    useEffect(() => {
        getOrdersList();
    }, [PageNumber, PageSize]);

    const onClearFilters = () => {
        setParams(initialState);
    };

    const PaginatorHandler = useCallback((action: 'PageNumber' | 'PageSize', value: number) => {
        setParams((pre) => ({ ...pre, [action]: value }));
    }, []);


    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <div className="flex items-center justify-between">
                <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t("page_title.orders")}</h1>
                <div className="flex gap-2 px-2 py-1 rounded-md bg-L-gray-300 dark:bg-D-gray-300 text-L-gray-600 dark:text-D-gray-600">
                    <Tippy content={t("Action_Button.Update")} className="text-xs">
                        <Refresh2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                    <Tippy content={t("Action_Button.ExportExcel")} className="text-xs">
                        <Excel2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                </div>
            </div>
            <div className="grid gap-4 grid-rows-min-one">
                <OrdersFilter params={params} setParams={setParams} onSubmit={getOrdersList} onClear={onClearFilters} />
                <div className="grid grid-rows-one-min">
                    <OrdersTable
                        data={ordersList}
                        loading={isFetching}
                        pageNumber={PageNumber}
                        pagesize={PageSize}
                        PaginatorHandler={PaginatorHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default Orders;
