import { useMemo } from 'react';
// import { useGetOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { valueFormatterSide } from 'src/utils/helpers';

type RequestData = {
    customerTitle : string;
    symbolISIN : string;
    orderSide: string;
    quantity: number;
    sumExecuted : number;
    price : number;
    valuePosition : number;
    // creditRequest: Boolean;
};

const Requests = () => {
    // const { data } = useGetOrders('side=None' , {
    //     select : (data : RequestData[]) => data.map((item : RequestData) => ({
    //         customerTitle : item.customerTitle,          
    //         symbolISIN : item.symbolISIN,          
    //         orderSide : item.orderSide,          
    //         quantity : item.quantity,          
    //         price : item.price,          
    //         sumExecuted : item.sumExecuted,          
    //         valuePosition : item.valuePosition,          
    //     }))
    // });

    const columns = useMemo(
        (): ColDefType<RequestData>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customerTitle' },
            { headerName: 'نام نماد', field: 'symbolISIN' },
            { headerName: 'سمت', field: 'orderSide' , valueFormatter : valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'تعداد انجام شده', field: 'sumExecuted', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'ارزش کل معامله', field: 'valuePosition', type: 'sepratedNumber' },
            // { headerName: 'اعتبار درخواست', field: 'creditRequest' },
        ],
        [],
    );

    return (
        <div className="w-full h-full p-3">
            <AGTable rowData={[]} columnDefs={columns} />
        </div>
    );
};

export default Requests;
