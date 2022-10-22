import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { useGetOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import FilterTable from '../components/FilterTable';
import useHandleFilterOrder from '../components/useHandleFilterOrder';
type IDoneOrders = {
    ClickLeftNode: any;
};
const DoneOrders : FC<IDoneOrders> = ({ ClickLeftNode }) => {
    const { data: dataBeforeFilter } = useGetOrders({ GtOrderStateRequestType: 'Done' });
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterOrder({ dataBeforeFilter });
    const { isFilter } = ClickLeftNode;


    const columns = useMemo(
        (): ColDefType<IOrderGetType>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customerTitle' },
            { headerName: 'نام نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'orderSide', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'ارزش معامله', field: 'value', type: 'abbreviatedNumber' },
            // { headerName: 'تعداد انجام شده', field: 'sumExecuted', type: 'sepratedNumber' },
            // { headerName: 'تعداد صف پیش رو', field: 'position', type: 'sepratedNumber' },
            // { headerName: 'حجم پیش رو در صف', field: 'valuePosition', type: 'sepratedNumber' },
            // { headerName: 'اعتبار درخواست', field: 'validity', valueFormatter: valueFormatterValidity },
            // {
            //     headerName: 'عملیات',
            //     field: 'customTitle',
            //     cellRenderer: (row : any) => <ActionCell id={row.data.id} type={TypeActionEnum.OPEN_ORDER}/>,
            // },
        ],
        [],
    );

    return (
        <div
            className={clsx('w-full p-3', {
                'h-full': !isFilter,
                'h-[calc(100%-50px)]': isFilter,
            })}
        >
             <div data-actived={isFilter} className="h-0 actived:h-auto transition-all opacity-0 actived:opacity-100">
                <FilterTable {...{ FilterData, handleChangeFilterData }} />
            </div>
            <AGTable rowData={dataAfterfilter} columnDefs={columns} enableBrowserTooltips={false} />
        </div>
    );
};

export default DoneOrders;
