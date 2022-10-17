import { useMemo } from 'react';
import { useGetOrders, useSingleDeleteOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { useAppDispatch } from 'src/redux/hooks';
import { setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import FilterTable from '../components/FilterTable';
import useHandleFilterOrder from '../components/useHandleFilterOrder';

const FailedOrders = () => {
    const { data: dataBeforeFilter } = useGetOrders({ GtOrderStateRequestType: 'Error' });
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterOrder({ dataBeforeFilter });
    const { mutate } = useSingleDeleteOrders();
    const appDispath = useAppDispatch();

    const handleDelete = (data: IOrderSelected) => {
        mutate(data.orderId);
    };

    const handleEdit = (data: IOrderSelected) => {
        appDispath(setDataBuySellAction(data));
    };

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
                cellRenderer: (row: any) => (
                    <ActionCell
                        data={row.data}
                        type={[TypeActionEnum.DELETE, TypeActionEnum.EDIT]}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                ),
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
