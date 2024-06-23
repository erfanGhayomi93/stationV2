import React, { useMemo } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';

type RequestData = {
    customerTitle: string;
    symbolISIN: string;
    orderSide: string;
    quantity: number;
    sumExecuted: number;
    price: number;
    valuePosition: number;
    orderSide2: number;
    orderSide3: number;
    // creditRequest: Boolean;
};

const Portfolio = () => {
    const columns = useMemo(
        (): ColDefType<RequestData>[] => [
            { headerName: 'نماد', field: 'customerTitle' },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت سر‌به‌سر', field: 'price', type: 'sepratedNumber' },
            { headerName: 'ارزش دارایی', field: 'valuePosition', type: 'sepratedNumber' },
            { headerName: 'ایستگاه', field: 'symbolISIN' },
            { headerName: 'درصد سود و زیان', field: 'orderSide' },
            { headerName: 'مبلغ سود و زیان', field: 'orderSide2' },
            { headerName: 'سود مجمع', field: 'orderSide3' },
          
        ],
        [],
    );

    return (
        <div className="w-full h-full p-3">
            <AGTable rowData={[]} columnDefs={columns} />
        </div>
    );
};

export default Portfolio;
