import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'src/common/components/Input';
import Select from 'src/common/components/Select';
import { ExcelIcon, FilterIcon } from 'src/common/icons';

type filterBasketType = {
    handleFilter: (data: filterStateType) => void;
    isShowFilter: boolean;
    setisShowFilter: (val: boolean) => void;
};

export type filterStateType = {
    symbolTitle: string;
    customerTitles: string;
    side: string;
};

export const initialDataFilterBasket = {
    symbolTitle: '',
    customerTitles: '',
    side: 'All',
};

export const FilterBasket: FC<filterBasketType> = ({ handleFilter, isShowFilter, setisShowFilter }) => {
    const [dataFilter, setdataFilter] = useState<filterStateType>(initialDataFilterBasket);

    const handleChange = (type: string, value: string) => {
        setdataFilter((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const handleDefaultState = () => {
        setdataFilter(initialDataFilterBasket);
        handleFilter(initialDataFilterBasket);
    };

    const { t } = useTranslation();
    return (
        <div className="gap-6">
            <div className="flex justify-between items-center">
                <div
                    className="bg-L-primary-50 dark:bg-D-primary-50 rounded w-fit px-[6px] py-[7px] cursor-pointer"
                    data-cy="basket-filter-button"
                    onClick={() => setisShowFilter(!isShowFilter)}
                >
                    <FilterIcon className="text-L-basic dark:text-D-basic" width={20} height={18} />
                </div>
                <div className="bg-L-primary-50 dark:bg-D-primary-50 rounded w-fit px-[6px] py-[7px] cursor-pointer border border-L-primary-50 dark:border-D-primary-50">
                    <ExcelIcon className="text-L-basic dark:text-D-basic" width={20} height={18} />
                </div>
            </div>

            <div
                data-actived={isShowFilter}
                className="opacity-0 actived:opacity-100 h-0 actived:h-auto actived:transition-opacity flex justify-between border border-L-gray-400 dark:border-D-gray-400 bg-L-basic dark:bg-D-basic p-0 actived:p-4 rounded-lg my-6"
            >
                <div className="flex gap-16">
                    <div>
                        <label className="text-L-gray-500 dark:text-D-gray-700" htmlFor="customer">
                            مشتری :
                        </label>
                        <div className="mt-2 w-[206px] border-L-gray-400 dark:border-D-gray-400 hover:border-L-gray-400 dark:hover:border-D-gray-400 border overflow-hidden rounded">
                            <Input
                                placeholder="نام"
                                id="customer"
                                data-cy="basket-filter-input-customer"
                                value={dataFilter.customerTitles}
                                onChange={(e) => handleChange('customerTitles', e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-L-gray-500 dark:text-D-gray-700" htmlFor="symbol">
                            نماد :
                        </label>
                        <div className="mt-2 w-[206px] border-L-gray-400 dark:border-D-gray-400 hover:border-L-gray-400 dark:hover:border-D-gray-400 border overflow-hidden rounded">
                            <Input
                                placeholder="نام"
                                id="symbol"
                                data-cy="basket-filter-input-symbol"
                                value={dataFilter.symbolTitle}
                                onChange={(e) => handleChange('symbolTitle', e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="inline-block text-L-gray-500 dark:text-D-gray-700" htmlFor="customer">
                            سمت سفارش :
                        </label>
                        <div className="mt-2 w-[206px]">
                            <Select
                                data-cy="basket-filter-input-side"
                                onChange={(selected) => handleChange('side', selected)}
                                value={dataFilter.side}
                                options={[
                                    { value: 'buy', label: t('orderSide.buy') },
                                    { value: 'sell', label: t('orderSide.sell') },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-end">
                    <button
                        data-cy="basket-filter-button-submit"
                        onClick={() => handleFilter(dataFilter)}
                        className="bg-L-primary-50 dark:bg-D-primary-50 py-1 px-10 ml-4 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded"
                    >
                        جستجو
                    </button>
                    <button
                        data-cy="basket-filter-button-default"
                        onClick={handleDefaultState}
                        className="bg-L-primary-100 dark:bg-D-primary-100 py-1 px-4 border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 rounded"
                    >
                        پیش فرض
                    </button>
                </div>
            </div>
        </div>
    );
};
