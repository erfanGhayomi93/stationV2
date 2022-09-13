import React, { useMemo } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';

type GroupOrderData = {
    customer: string;
    symbolName: string;
    side: string;
    number: number;
    tradeValue: number;
    creditRequest: Boolean;
};

const GroupOrders = () => {

    const columns = useMemo(
        (): ColDefType<GroupOrderData>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customer' },
            { headerName: 'نام نماد', field: 'symbolName' },
            { headerName: 'سمت', field: 'side' },
            { headerName: 'تعداد', field: 'number' },
            { headerName: 'قیمت', field: 'tradeValue' },
            { headerName: 'ارزش کل معامله', field: 'tradeValue' },
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


export default GroupOrders;
