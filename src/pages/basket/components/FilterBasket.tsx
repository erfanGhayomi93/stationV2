import { useState, useEffect, FC } from 'react';
import { DateObject } from 'react-multi-date-picker';
import AdvancedDatePicker, { DateType } from 'src/common/components/AdvancedDatePicker';
import Input from 'src/common/components/Input';
import { ExcelIcon, FilterIcon } from 'src/common/icons';

type filterBasketType = {
    handleFilter: (data: filterStateType) => void;
};

export type filterStateType = {
    symbolTitle: string;
    customerTitles: string;
    date: DateType;
};

const initialDataFilter = {
    symbolTitle: '',
    customerTitles: '',
    date: null,
};

export const FilterBasket: FC<filterBasketType> = ({ handleFilter }) => {
    const [isShowFilter, setisShowFilter] = useState(true);
    const [dataFilter, setdataFilter] = useState<filterStateType>(initialDataFilter);

    const handleChange = (type: string, value: string | DateType) => {
        setdataFilter((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const handleDefaultState = () => {
        setdataFilter(initialDataFilter)
        handleFilter(initialDataFilter)
    }

    return (
        <div className="gap-6">
            <div className="flex justify-between items-center">
                <div className="bg-L-primary-50 dark:bg-D-primary-50 rounded w-fit px-[6px] py-[7px] cursor-pointer">
                    <FilterIcon className="text-L-basic dark:text-D-basic" width={20} height={18} onClick={() => setisShowFilter((prev) => !prev)} />
                </div>
                <div className="bg-L-primary-50 dark:bg-D-primary-50 rounded w-fit px-[6px] py-[7px] cursor-pointer border border-L-primary-50 dark:border-D-primary-50">
                    <ExcelIcon className="text-L-basic dark:text-D-basic" width={20} height={18} />
                </div>
            </div>

            <div
                data-actived={isShowFilter}
                className="opacity-0 actived:opacity-100 h-0 actived:h-auto actived:transition-opacity flex justify-between border border-L-gray-350 dark:border-D-gray-350 bg-L-basic dark:bg-D-basic p-0 actived:p-4 rounded-lg my-6"
            >
                <div className="flex gap-16">
                    <div>
                        <label className="text-L-gray-500 dark:text-D-gray-500" htmlFor="symbol">
                            نماد :
                        </label>
                        <div className="mt-2 w-[206px] border-L-gray-350 dark:border-D-gray-350 hover:border-L-gray-350 dark:hover:border-D-gray-350 border overflow-hidden rounded">
                            <Input
                                placeholder="نام"
                                id="symbol"
                                value={dataFilter.symbolTitle}
                                onChange={(e) => handleChange('symbolTitle', e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-L-gray-500 dark:text-D-gray-500" htmlFor="customer">
                            مشتری :
                        </label>
                        <div className="mt-2 w-[206px] border-L-gray-350 dark:border-D-gray-350 hover:border-L-gray-350 dark:hover:border-D-gray-350 border overflow-hidden rounded">
                            <Input
                                placeholder="نام"
                                id="customer"
                                value={dataFilter.customerTitles}
                                onChange={(e) => handleChange('customerTitles', e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="inline-block text-L-gray-500 dark:text-D-gray-500" htmlFor="customer">
                            تاریخ سفارش :
                        </label>
                        <div className="mt-2 w-[173px]">
                            <AdvancedDatePicker
                                value={dataFilter.date}
                                onChange={(selectedDates) => handleChange('date', selectedDates)}
                                className="text-L-gray-400 dark:text-D-gray-400"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-end">
                    <button
                        onClick={() => handleFilter(dataFilter)}
                        className="bg-L-primary-50 dark:bg-D-primary-50 py-1 px-10 ml-4 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded"
                    >
                        جستجو
                    </button>
                    <button onClick={handleDefaultState} className="bg-L-primary-100 dark:bg-D-primary-100 py-1 px-4 border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 rounded">
                        پیش فرض
                    </button>
                </div>
            </div>
        </div>
    );
};
