import React, { useState } from 'react';
import AGTable from 'src/common/components/AGTable';
import { DotIcon } from 'src/common/components/LinearRangeChart/Icons';
import { GearIcon, Search } from 'src/common/icons';
import CustomerSearchInput from './CustomerSearchInput';

const CustomerSearch = () => {
    const [rowData] = useState([
        { make: 'نام و نام خانوادگی', model: '...', price: 35000 },
        { make: 'نام و نام خانوادگی', model: '...', price: 32000 },
        { make: 'نام و نام خانوادگی', model: '...', price: 72000 },
    ]);

    const [columnDefs] = useState([
        { field: 'make', headerName: 'نام' },
        { field: 'price', headerName: 'دارایی' },
        { field: 'model', headerName: 'عملیات' },
    ]);
    //
    return (
        <div className="w-full h-full grid gap-2 grid-rows-min-one overflow-y-auto">
            <CustomerSearchInput />
            <div className="bg-white h-full rounded py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                <div className="flex gap-2  py-2">
                    <button className="bg-[#D6E9FF] text-[#135CA4] border-solid border-[#135CA4] border px-2 py-1 rounded-md">مشتری</button>
                    <button className="bg-[#E2EBF3] text-[#566978] border-solid border-transparent border px-2 py-1 rounded-md">گروه مشتری</button>
                    <button className="bg-[#E2EBF3] text-[#566978] border-solid border-transparent border px-2 py-1 rounded-md">گروه من</button>
                    <button className="bg-[#E2EBF3] text-[#566978] border-solid border-transparent border px-2 py-1 rounded-md">
                        همه انتخاب شده‌ها
                    </button>
                </div>
                <AGTable rowData={rowData} columnDefs={columnDefs} />
            </div>
        </div>
    );
};

export default CustomerSearch;
