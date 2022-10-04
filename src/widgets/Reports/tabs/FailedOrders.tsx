import { useMemo } from 'react';
import { useGetOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import FilterTable from '../components/FilterTable';
import useHandleFilterOrder from '../components/useHandleFilterOrder';

const FailedOrders = () => {
    const { data: dataBeforeFilter } = useGetOrders('GtOrderStateRequestType=Error', {
        select: (data: IOrderSelected[]) =>
            data.map((item: IOrderSelected) => ({
                customerTitle: item.customerTitle,
                symbolTitle: item.symbolTitle,
                orderSide: item.orderSide,
                quantity: item.quantity,
                price: item.price,
                value: item.value,
                sumExecuted: item.sumExecuted,
                position: item.position,
                valuePosition: item.valuePosition,
                validity: item.validity,
                validityDate: item.validityDate,
            })),
    });
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterOrder({ dataBeforeFilter });

    const columns = useMemo(
        (): ColDefType<IOrderSelected>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customerTitle' },
            { headerName: 'نام نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'orderSide', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'ارزش معامله', field: 'value', type: 'abbreviatedNumber' },
            { headerName: 'تعداد انجام شده', field: 'sumExecuted', type: 'sepratedNumber' },
            { headerName: 'تعداد صف پیش رو', field: 'position', type: 'sepratedNumber' },
            { headerName: 'حجم پیش رو در صف', field: 'valuePosition', type: 'sepratedNumber' },
            { headerName: 'اعتبار درخواست', field: 'validity', valueFormatter: valueFormatterValidity },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                cellRenderer: (row: any) => <ActionCell id={row.data.id} type={TypeActionEnum.OPEN_ORDER} />,
            },
        ],
        [],
    );
    return (
        <div className="w-full h-[calc(100%-50px)] p-3">
            <FilterTable {...{ FilterData, handleChangeFilterData }} />
            <AGTable rowData={dataAfterfilter as undefined} columnDefs={columns} enableBrowserTooltips={false} />
        </div>
    );
};

export default FailedOrders;
