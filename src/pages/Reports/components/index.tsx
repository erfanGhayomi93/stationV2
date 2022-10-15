import { useState, useEffect } from 'react';
import { DateObject } from 'react-multi-date-picker';
import AdvancedDatePicker from 'src/common/components/AdvancedDatePicker';
import CustomerMiniSelect from 'src/common/components/CustomerMiniSelect';
import Input from 'src/common/components/Input';
import { ExcelIcon, FilterIcon } from 'src/common/icons';

export const ReportFilter = () => {
    const [date, setDate] = useState<any>(null);
    const [isShowFilter, setisShowFilter] = useState(true);
    // useEffect(() => {
    //     console.log(date?.toString());
    // }, [date]);

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
                data-actived={!isShowFilter}
                className="actived:opacity-0 h-auto !actived:h-0 transition-opacity flex justify-between border border-L-gray-350 dark:border-D-gray-350 bg-L-basic dark:bg-D-basic p-4 rounded-lg my-6"
            >
                <div className="flex gap-16">
                    <div>
                        <label className="text-L-gray-500 dark:text-D-gray-500" htmlFor="symbol">
                            نماد :
                        </label>
                        <div className="mt-2 w-[206px] border-L-gray-350 dark:border-D-gray-350 hover:border-L-gray-350 dark:hover:border-D-gray-350 border overflow-hidden rounded">
                            <Input placeholder="نام" id="symbol" />
                        </div>
                    </div>
                    <div>
                        <label className="text-L-gray-500 dark:text-D-gray-500" htmlFor="customer">
                            مشتری :
                        </label>
                        <div className="mt-2">
                            <CustomerMiniSelect />
                        </div>
                    </div>
                    <div>
                        <label className="inline-block text-L-gray-500 dark:text-D-gray-500" htmlFor="customer">
                            تاریخ سفارش :
                        </label>
                        <div className="mt-2 w-[173px]">
                            <AdvancedDatePicker
                                value={date}
                                onChange={(selectedDates) => setDate(selectedDates)}
                                className="text-L-gray-400 dark:text-D-gray-400"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-end">
                    <button className="bg-L-primary-50 dark:bg-D-primary-50 py-1 px-10 ml-4 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded">
                        جستجو
                    </button>
                    <button className="bg-L-primary-100 dark:bg-D-primary-100 py-1 px-4 border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 rounded">
                        پیش فرض
                    </button>
                </div>
            </div>
        </div>
    );
};
