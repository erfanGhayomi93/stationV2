import { useMemo } from 'react';
import { useGetOfflineRequests } from 'src/app/queries/order';
// import { useGetOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { valueFormatterSide } from 'src/utils/helpers';

type RequestData = {
    customerTitle: string;
    symbolISIN: string;
    orderSide: string;
    quantity: number;
    sumExecuted: number;
    price: number;
    valuePosition: number;
    // creditRequest: Boolean;
};

const Requests = () => {
    //
    const { data } = useGetOfflineRequests(
        {},
        {
            onSuccess: (data) => {
                console.log(data);
            },
        },
    );

    const columns = useMemo(
        (): ColDefType<RequestData>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customerTitle' },
            { headerName: 'نام نماد', field: 'symbolISIN' },
            { headerName: 'سمت', field: 'orderSide', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'ارزش کل معامله', field: 'valuePosition', type: 'sepratedNumber' },
            { headerName: 'اعتبار درخواست', field: 'validity' },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                // cellRenderer: (row : any) => <ActionCell id={row.data.id} type={TypeActionEnum.OPEN_ORDER}/>,
            },
        ],
        [],
    );

    return (
        <div className={'grid h-full p-3'}>
            <AGTable rowData={[]} columnDefs={columns} />
        </div>
    );
};

export default Requests;
