import React, { useState } from 'react';
import AGTable from 'src/common/components/AGTable';

const Watchlist = () => {
    const [rowData] = useState([
        { make: 'اخابر', model: 'Celica', price: 35000 },
        { make: 'کاما', model: 'Mondeo', price: 32000 },
        { make: 'خودرو', model: 'Boxster', price: 72000 },
    ]);

    const [columnDefs] = useState([
        { field: 'make', headerName: 'نماد' },
        { field: 'price', headerName: 'قیمت لحظه ای' },
        { field: 'price', headerName: 'قیمت پایانی' },
        { field: 'price', headerName: 'حجم معاملاتی' },
        { field: 'price', headerName: 'ارزش معاملاتی' },
        { field: 'model', headerName: 'عملیات' },
    ]);
    //
    return (
        <div className="px-3 py-1 flex flex-col h-full">
            <div className="py-3">actions</div>
            <div className="grow">
                <AGTable rowData={rowData} columnDefs={columnDefs} />
            </div>
        </div>
    );
};

export default Watchlist;
