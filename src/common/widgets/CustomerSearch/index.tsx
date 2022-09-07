import clsx from 'clsx';
import React, { useState, FC } from 'react';
import { useCustomerList } from 'src/app/queries';
import AGTable from 'src/common/components/AGTable';
import Input from 'src/common/components/Input';
import { DotIcon } from 'src/common/components/LinearRangeChart/Icons';
import WidgetLoading from 'src/common/components/WidgetLoading';
import useDebounce from 'src/common/hooks/useDebounce';
import { GearIcon, Search } from 'src/common/icons';
import CustomerSearchInput from './CustomerSearchInput';

const CustomerSearch = () => {
    const [params, setParams] = useState<IGoCustomerRequest>({ type: 'Customer' });
    const debouncedParams = useDebounce(params, 500);

    const { data: searchResult, isLoading: isSearchLoading } = useCustomerList(debouncedParams);

    const [columnDefs] = useState([
        { field: 'customerTitle', headerName: 'نام' },
        { field: 'balance', headerName: 'دارایی' },
        { field: 'customerTitle', headerName: 'عملیات' },
    ]);
    //
    return (
        <div className="w-full h-full grid gap-2 grid-rows-min-one overflow-y-auto">
            {/* <CustomerSearchInput /> */}
            <Input
                placeholder="جستجوی مشتری"
                addonBefore={<Search className="text-gray-400" />}
                onChange={(e) => setParams((prev) => ({ ...prev, term: e.target.value }))}
            />
            <WidgetLoading spining={isSearchLoading}>
                <div className="bg-white h-full rounded py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                    <div className="flex gap-2  py-2">
                        {searchResult?.typeCounts.map((type) => (
                            <>
                                <button
                                    disabled={!type.count}
                                    className={clsx(
                                        'bg-[#E2EBF3] disabled:opacity-60 relative text-[#566978] border-solid border-transparent border px-2 py-1 rounded-md',
                                    )}
                                >
                                    <CounterBalloon count={type.count} />
                                    {type.type}
                                </button>
                            </>
                        ))}
                        <button className="bg-[#E2EBF3] text-[#566978] border-solid border-transparent border px-2 py-1 rounded-md">
                            همه انتخاب شده‌ها
                        </button>
                    </div>
                    <AGTable rowData={searchResult?.searchResult.result} columnDefs={columnDefs} />
                </div>
            </WidgetLoading>
        </div>
    );
};

export default CustomerSearch;

interface ICounterBalloonType {
    count: number;
}
const CounterBalloon: FC<ICounterBalloonType> = ({ count }) => {
    return (
        <span
            className={clsx(
                'absolute bg-rose-400 -top-2 -left-2 rounded-full flex justify-center text-white items-center leading-none w-6 h-6 duration-200',
                !!count ? '' : 'scale-0',
            )}
        >
            {count > 9 ? '9+' : count}
        </span>
    );
};
