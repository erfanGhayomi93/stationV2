import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomerMiniSelect from 'src/common/components/CustomerMiniSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import MultiSelect from 'src/common/components/MultiSelect';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import TradeInput from 'src/widgets/BuySell/components/Input';
import { TurnoverFilterTypes } from '../..';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';

interface IProps {
    params: TurnoverFilterTypes;
    setParams: React.Dispatch<React.SetStateAction<TurnoverFilterTypes>>;
}

const TurnOverFilter = ({ params, setParams }: IProps) => {
    //
    const { t } = useTranslation();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleValueCahnge = (part: keyof TurnoverFilterTypes, value: any) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsFilterOpen(!isFilterOpen);

    const onSubmit = () => {};

    const onClear = () => {};

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMiniSelect
                        selected={params.customer}
                        setSelected={(selected) => handleValueCahnge('customer', selected)}
                        filterCustomerType={false}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect multiple selected={params.symbols} setSelected={(selected) => handleValueCahnge('symbols', selected)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.MarketUnit')}>
                    <Select onChange={(selected) => handleValueCahnge('marketUnit', selected)} value={params.marketUnit} options={[]} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Time')}>
                    <Select
                        onChange={(selected) => handleValueCahnge('time', selected)}
                        value={params.time}
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
                    <AdvancedDatepicker value={params.fromDate} onChange={(v) => handleValueCahnge("fromDate",v)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatepicker value={params.toDate} onChange={(v) => handleValueCahnge("toDate", v)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.TransactionType')} className="col-span-3">
                    <MultiSelect
                        onChange={(selected) => handleValueCahnge('side', selected)}
                        value={params.side}
                        // value={side}
                        options={[
                            { value: 'buy', label: t('TransactionTypes.buy') },
                            { value: 'sell', label: t('TransactionTypes.sell') },
                            { value: 'deposit', label: t('TransactionTypes.deposit') },
                            { value: 'withdrawal', label: t('TransactionTypes.withdrawal') },
                        ]}
                    />
                </FilterBlock>
                {isFilterOpen ? (
                    <>
                        <FilterBlock label={t('FilterFieldLabel.FromCost')}>
                            <div className="h-8 flex text-xs items-center rounded-md border border-L-gray-400 dark:border-D-gray-400 overflow-hidden dark:focus-within:border-L-info-100 focus-within:border-L-info-100">
                                <TradeInput value={params.fromCost} onChange={(value) => handleValueCahnge('fromCost', value)} />
                            </div>
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.ToCost')}>
                            <div className="h-8 flex text-xs items-center rounded-md border border-L-gray-400 dark:border-D-gray-400 overflow-hidden dark:focus-within:border-L-info-100 focus-within:border-L-info-100">
                                <TradeInput value={params.toCost} onChange={(value) => handleValueCahnge('toCost', value)} />
                            </div>
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.AggregateAble')}>
                            <Select
                                value={params.AggregateAble}
                                onChange={(value) => handleValueCahnge('AggregateAble', value)}
                                options={[
                                    { value: true, label: 'بله' },
                                    { value: false, label: 'خیر' },
                                ]}
                            />
                        </FilterBlock>
                    </>
                ) : (
                    <></>
                )}
                <div className="col-span-3">
                    <FilterActions isFilterBoxOpen={isFilterOpen} toggleFilterBox={toggleFilterBox} onSubmit={onSubmit} onClear={onClear} />
                </div>
            </div>
        </div>
    );
};

export default TurnOverFilter;
