import Tippy from '@tippyjs/react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';
import { useState } from 'react';
import { DateType } from 'src/common/components/AdvancedDatePicker';
import dayjs from 'dayjs';
import OrdersFilter from './components/OrderFilter';
import OrdersTable from './components/OrderTable';
import { useTranslation } from 'react-i18next';

export interface OrdersFilterTypes {
    customers: IGoCustomerSearchResult[];
    symbols: SymbolSearchResult[];
    fromDate: DateType;
    toDate: DateType;
    side: string[];
    customerType: string[];
    status: string[]
}

const Orders = () => {
    //
    const { t } = useTranslation()
    const [params, setParams] = useState<OrdersFilterTypes>({
        customers: [],
        symbols: [],
        fromDate: dayjs().subtract(1, "day").format(),
        toDate: '',
        side: [],
        customerType: [],
        status: []
    })

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
                <OrdersFilter params={params} setParams={setParams}/>
                <div className="grid grid-rows-one-min">
                    <OrdersTable />
                </div>
            </div>
        </div>
    );
};

export default Orders;
