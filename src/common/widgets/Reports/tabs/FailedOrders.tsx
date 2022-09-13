import React, { useMemo } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';

type FailedOrderData = {
    customer: string;
    symbolName: string;
    side: string;
    number: number;
    tradeValue: number;
    description: string;
};

const FailedOrders = () => {

    const columns = useMemo(
        (): ColDefType<FailedOrderData>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customer' },
            { headerName: 'نام نماد', field: 'symbolName' },
            { headerName: 'سمت', field: 'side' },
            { headerName: 'تعداد', field: 'number' },
            { headerName: 'قیمت', field: 'tradeValue' },
            { headerName: 'ارزش کل معامله', field: 'tradeValue' },
            { headerName: 'توضیحات', field: 'description' },
        ],
        [],
    );
    //
    return (
        <div className="w-full h-full p-3">
            <AGTable rowData={[]} columnDefs={columns} />
        </div>
    );
};


export default FailedOrders;
