import React, { useMemo } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';

type DoneOrderData = {
    customer: string;
    symbolName: string;
    side: string;
    number: number;
    tradeValue: number;
};

const DoneOrders = () => {
    const columns = useMemo(
        (): ColDefType<DoneOrderData>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customer' },
            { headerName: 'نام نماد', field: 'symbolName' },
            { headerName: 'سمت', field: 'side' },
            { headerName: 'تعداد', field: 'number' },
            { headerName: 'قیمت', field: 'tradeValue' },
            { headerName: 'ارزش کل معامله', field: 'tradeValue' },
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


export default DoneOrders;
