import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterBlock from 'src/common/components/FilterBlock';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';

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
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect selected={[]} setSelected={() => {}} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect selected={[]} setSelected={() => {}} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Side')}>
                    <Select
                        onChange={(selected) => {}}
                        value={''}
                        options={[
                            { value: 'Buy', label: t('orderSide.Buy') },
                            { value: 'Sell', label: t('orderSide.Sell') },
                        ]}
                    />
                </FilterBlock>

                <div className="flex items-center col-span-4 pr-8">
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
