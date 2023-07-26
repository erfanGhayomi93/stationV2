import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdvancedDatePicker from 'src/common/components/AdvancedDatePicker';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import MultiSelect from 'src/common/components/MultiSelect';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { TradesFilterTypes } from '../..';

interface IProps {
    params: TradesFilterTypes;
    setParams: React.Dispatch<React.SetStateAction<TradesFilterTypes>>;
}

const TradesFilter = ({ params, setParams }: IProps) => {
    //
    const { t } = useTranslation();
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const handleValueCahnge = (part: keyof TradesFilterTypes, value: any) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsOpenFilter(!isOpenFilter);

    const onSubmit = () => {};

    const onClear = () => {};

    return (
        <div className="bg-L-gray-100 dark:bg-L-gray-700 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect onChange={(selected) => handleValueCahnge('customers', selected)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect multiple setSelected={(selected) => handleValueCahnge('symbols', selected)} selected={params.symbols} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Time')}>
                    <Select
                        onChange={(selected) => handleValueCahnge('time', selected)}
                        value={params.time}
                        // value={side}
                        options={[
                            { value: 'day', label: t('timeSheet.day') },
                            { value: 'week', label: t('timeSheet.week') },
                            { value: 'month', label: t('timeSheet.month') },
                            { value: 'year', label: t('timeSheet.year') },
                            { value: 'custom', label: t('timeSheet.custom') },
                        ]}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')}>
                    <AdvancedDatePicker
                        value={params.fromDate}
                        onChange={(selectedDates) => handleValueCahnge('fromDate', selectedDates)}
                        className="text-L-gray-500 dark:text-D-gray-500 py-1.5 w-full duration-250 dark:focus-visible:border-D-infoo-100 focus-visible:border-L-info-100"
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatePicker
                        value={params.toDate}
                        onChange={(selectedDates: any) => handleValueCahnge('toDate', selectedDates)}
                        className="text-L-gray-500 dark:text-D-gray-500 py-1.5 w-full duration-250 dark:focus-visible:border-D-infoo-100 focus-visible:border-L-info-100"
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Side')}>
                    <MultiSelect
                        onChange={(selected) => handleValueCahnge('side', selected)}
                        value={params.side}
                        // value={side}
                        options={[
                            { value: 'buy', label: t('orderSide.buy') },
                            { value: 'sell', label: t('orderSide.sell') },
                        ]}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.CustomerType')} className="col-span-3">
                    <MultiSelect
                        onChange={(selected) => handleValueCahnge('customerType', selected)}
                        value={params.customerType}
                        // value={side}
                        options={[
                            { value: 'CustomerTag', label: t('CustomerType.CustomerTag') },
                            { value: 'Legal', label: t('CustomerType.Legal') },
                            { value: 'Natural', label: t('CustomerType.Natural') },
                            { value: 'GTCustomerGroup 0', label: t('CustomerType.GTCustomerGroup 0') },
                            { value: 'GTCustomerGroup', label: t('CustomerType.GTCustomerGroup') },
                            { value: 'TraderGroup', label: t('CustomerType.TraderGroup') },
                        ]}
                    />
                </FilterBlock>
                <div className="col-span-3">
                    <FilterActions isFilterBoxOpen={isOpenFilter} toggleFilterBox={toggleFilterBox} onSubmit={onSubmit} onClear={onClear} />
                </div>
            </div>
        </div>
    );
};

export default TradesFilter;
