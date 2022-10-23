import { FC, useMemo, useState } from 'react';
import { useOrderLists } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { valueFormatterIndex } from 'src/utils/helpers';
import { useReportsState } from '../../Context/ReportsContext';

interface IReportTableType {}

const ReportTable: FC<IReportTableType> = ({}) => {
    const [active, setActive] = useState(1);
    const PageSize = 10;
    const { FromDate: FromDate, customerISIN: CustomerISIN, side: Side, status: OrderStatus, symbolISIN, ToDate: ToDate } = useReportsState();

    const {
        data: reportList,
        isFetching,
        refetch,
    } = useOrderLists(
        { CustomerISIN, FromDate, OrderStatus, PageNumber: active, PageSize, Side, symbolISIN, ToDate },
        { onSuccess: (data) => setActive(data.pageNumber) },
    );

    const handlePaginate = (inx: number) => {
        setActive(inx);
        const timeout = setTimeout(() => {
            refetch();
            clearTimeout(timeout);
        }, 200);
    };
    const Columns = useMemo(
        (): ColDefType<IGTOrderListResultType>[] => [
            { headerName: 'ردیف', field: 'customerTitles', valueFormatter: (data) => valueFormatterIndex(data, active, PageSize), width: 20 },
            { headerName: 'مشتری', field: 'customerTitle' },
            { headerName: 'نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'orderSide', type: 'sepratedNumber' },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'ارزش معامله', field: 'value', type: 'abbreviatedNumber' },
            { headerName: 'وضعیت', field: 'state', type: 'sepratedNumber' },
            { headerName: 'تاریخ', field: 'orderDateTime', type: 'date' },
            // { headerName: 'کارمزد معامله', field: 'lastTradedPrice', type: 'sepratedNumber' },
        ],
        [active],
    );

    return (
        <>
            <WidgetLoading spining={isFetching}>
                <AGTable rowData={reportList?.result || []} columnDefs={Columns} />
            </WidgetLoading>
            <div className="border-t flex justify-end items-center  pt-4 ">
                <Paginator loading={isFetching} current={active} total={reportList?.totalPages} onChange={handlePaginate} />
            </div>
        </>
    );
};

export default ReportTable;
