import React, { useMemo } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';

type OpenOrderData = {
    customer: string;
    symbolName: string;
    side: string;
    number: number;
    tradeValue: number;
    numberQueue: number;
    weightQueue: number;
    creditRequest: Boolean;
};

const OpenOrders = () => {
    const columns = useMemo(
        (): ColDefType<OpenOrderData>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customer' },
            { headerName: 'نام نماد', field: 'symbolName' },
            { headerName: 'سمت', field: 'side' },
            { headerName: 'تعداد', field: 'number' },
            { headerName: 'قیمت', field: 'tradeValue' },
            { headerName: 'ارزش معامله', field: 'tradeValue' },
            { headerName: 'تعداد صف پیش رو', field: 'numberQueue' },
            { headerName: 'حجم پیش رو در صف', field: 'weightQueue' },
            { headerName: 'اعتبار درخواست', field: 'creditRequest' },
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

export default OpenOrders;
