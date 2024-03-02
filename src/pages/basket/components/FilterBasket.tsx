import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterBlock from 'src/common/components/FilterBlock';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { useAppDispatch } from 'src/redux/hooks';
import { emptySelectedCustomers, emptySelectedSymbol } from 'src/redux/slices/option';

type filterBasketType = {
    setDetailParams: Dispatch<SetStateAction<filterStateType>>;
};

export type filterStateType = {
    SymbolISIN: SymbolSearchResult[];
    CustomerISINs: IGoCustomerSearchResult[];
    OrderSide: string;
    PageNumber: number;
    PageSize: number;
    CartId: number;
};

export const initialDataFilterBasket: filterStateType = {
    SymbolISIN: [],
    CustomerISINs: [],
    OrderSide: '',
    PageNumber: 1,
    PageSize: 10,
    CartId: 0,
};

const initialFilterData: Omit<filterStateType, 'PageSize' | 'PageNumber' | 'CartId'> = {
    CustomerISINs: [],
    OrderSide: '',
    SymbolISIN: [],
};

export const FilterBasket = ({ setDetailParams }: filterBasketType) => {
    const [filterData, setFilterData] = useState<typeof initialFilterData>(initialFilterData);
    const dispatch = useAppDispatch();

    const handleChange = (key: string, value: any) =>
        setFilterData((prev) => ({
            ...prev,
            [key]: value,
        }));

    const handleDefaultState = () => {
        dispatch(emptySelectedCustomers());
        dispatch(emptySelectedSymbol());
        setDetailParams((prev) => ({ ...initialDataFilterBasket, CartId: prev?.CartId }));
        setFilterData(initialFilterData);
    };

    const onSubmit = () => setDetailParams((prev) => ({ ...prev, ...filterData }));

    const { t } = useTranslation();

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect
                        selected={filterData?.CustomerISINs}
                        setSelected={(selected) =>
                            handleChange(
                                'CustomerISINs',
                                selected?.map((x) => x?.customerISIN),
                            )
                        }
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect
                        selected={filterData?.SymbolISIN}
                        setSelected={(selected) =>
                            handleChange(
                                'SymbolISIN',
                                selected?.map((x) => x?.symbolISIN),
                            )
                        }
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Side')}>
                    <Select
                        onChange={(selected) => handleChange('OrderSide', selected)}
                        value={filterData?.OrderSide}
                        options={[
                            { value: 'Buy', label: t('orderSide.Buy') },
                            { value: 'Sell', label: t('orderSide.Sell') },
                        ]}
                    />
                </FilterBlock>

                <div className="flex items-center col-span-4 pr-8">
                    <button
                        data-cy="basket-filter-button-submit"
                        onClick={onSubmit}
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
