import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import MultiSelect from 'src/common/components/MultiSelect';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { OrdersFilterTypes } from '../..';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import Select from 'src/common/components/Select';

interface IProps {
    params: OrdersFilterTypes;
    setParams: React.Dispatch<React.SetStateAction<OrdersFilterTypes>>;
}

const OrdersFilter = ({ params, setParams }: IProps) => {
    //
    const { t } = useTranslation();
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const handleValueCahnge = (part: keyof OrdersFilterTypes, value: any) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsOpenFilter(!isOpenFilter);

    const onSubmit = () => {};

    const onClear = () => {};

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect setSelected={(selected) => handleValueCahnge('customers', selected)} selected={params.customers as any}/>
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect multiple selected={params.symbols} setSelected={(selected) => handleValueCahnge('symbols', selected)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')}>
            <AdvancedDatepicker value={params.fromDate} onChange={(v)=>handleValueCahnge("fromDate", v)}/>
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                <AdvancedDatepicker value={params.toDate} onChange={(v)=>handleValueCahnge("toDate", v)}/>
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Side')}>
                    <Select
                        onChange={(selected) => handleValueCahnge('side', selected)}
                        value={params.side}
                        options={[
                            { value: 'Cross', label: t('orderSide.Cross') },
                            { value: 'Buy', label: t('orderSide.Buy') },
                            { value: 'Sell', label: t('orderSide.Sell') },
                        ]}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.CustomerType')} className="col-span-3">
                    <Select
                        onChange={(selected) => handleValueCahnge('customerType', selected)}
                        value={params.customerType}
                        options={[
                            { value: 'Legal', label: t('CustomerType.Legal') },
                            { value: 'Natural', label: t('CustomerType.Natural') }
                        ]}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Status')}>
                    <MultiSelect
                        onChange={(selected) => handleValueCahnge('status', selected)}
                        value={params.status}
                        options={[]}
                    />
                </FilterBlock>
                <div className="col-span-3">
                    <FilterActions isFilterBoxOpen={isOpenFilter} toggleFilterBox={toggleFilterBox} onSubmit={onSubmit} onClear={onClear} />
                </div>
            </div>
        </div>
    );
};

export default OrdersFilter;
