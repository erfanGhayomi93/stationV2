import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdvancedDatePicker from 'src/common/components/AdvancedDatePicker';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import MultiSelect from 'src/common/components/MultiSelect';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';

interface IProps {
    params: IGTTradesListRequest;
    setParams: React.Dispatch<React.SetStateAction<IGTTradesListRequest>>;
    onSubmit: () => void
}

const TradesFilter = ({ params, setParams, onSubmit }: IProps) => {
    //
    const { t } = useTranslation();
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const handleValueCahnge = (part: keyof IGTTradesListRequest, value: any) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsOpenFilter(!isOpenFilter);

    const onClear = () => {};

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect
                        onChange={(selected) =>
                            handleValueCahnge(
                                'CustomerISIN',
                                selected.map(({ customerISIN }) => customerISIN),
                            )
                        }
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    {/* <SymbolMiniSelect multiple onChange={(selected) => handleValueCahnge('SymbolISIN', selected)} /> */}
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Time')}>
                    <Select
                        onChange={(selected) => {}}
                        value={''}
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
                        value={params.FromDate}
                        onChange={(selectedDates) => handleValueCahnge('FromDate', selectedDates)}
                        className="text-L-gray-500 dark:text-D-gray-500 py-1.5 w-full duration-250 dark:focus-visible:border-D-infoo-100 focus-visible:border-L-info-100"
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatePicker
                        value={params.ToDate}
                        onChange={(selectedDates: any) => handleValueCahnge('ToDate', selectedDates)}
                        className="text-L-gray-500 dark:text-D-gray-500 py-1.5 w-full duration-250 dark:focus-visible:border-D-infoo-100 focus-visible:border-L-info-100"
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Side')}>
                    <Select
                        onChange={(selected) => handleValueCahnge('Side', selected)}
                        value={params.Side}
                        options={[
                            { value: 'Buy', label: t('orderSide.Buy') },
                            { value: 'Sell', label: t('orderSide.Sell') },
                            { value: 'Cross', label: t('orderSide.Cross') },
                        ]}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.CustomerType')} className="col-span-3">
                    <MultiSelect
                        onChange={(selected) => {}}
                        value={[]}
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
                <FilterBlock label={t('FilterFieldLabel.TradeStation')} className="col-span-3">
                    <Select onChange={(selected) => {}} value={''} options={[]} />
                </FilterBlock>
                <div className="col-span-3">
                    <FilterActions isFilterBoxOpen={isOpenFilter} toggleFilterBox={toggleFilterBox} onSubmit={onSubmit} onClear={onClear} />
                </div>
            </div>
        </div>
    );
};

export default TradesFilter;
