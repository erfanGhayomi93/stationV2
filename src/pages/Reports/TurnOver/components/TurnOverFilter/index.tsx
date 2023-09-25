import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomerMiniSelect from 'src/common/components/CustomerMiniSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import MultiSelect from 'src/common/components/MultiSelect';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import { timeFieldOptions } from 'src/pages/Reports/Trades/constant';
import { transactionSideField } from '../../constant';

interface IProps {
    params: ITurnOverStateType;
    setParams: React.Dispatch<React.SetStateAction<ITurnOverStateType>>;
    onSubmit: () => void;
    onClear: () => void;
}

const TurnOverFilter = ({ params, setParams, onClear, onSubmit }: IProps) => {
    //
    const { t } = useTranslation();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleValueCahnge = (part: keyof ITurnOverStateType, value: any) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsFilterOpen(!isFilterOpen);

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMiniSelect
                        selected={params.CustomerISIN}
                        setSelected={(selected) => handleValueCahnge('CustomerISIN', selected)}
                        filterCustomerType={false}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect  selected={params.SymbolISIN} setSelected={(selected) => handleValueCahnge('SymbolISIN', selected)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Time')}>
                    <Select onChange={(selected) => handleValueCahnge('Time', selected)} value={params.Time} options={timeFieldOptions} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')}>
                    <AdvancedDatepicker value={params.DateFrom} onChange={(v) => handleValueCahnge('DateFrom', v)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatepicker value={params.DateTo} onChange={(v) => handleValueCahnge('DateTo', v)} />
                </FilterBlock>
                {isFilterOpen && (
                    <>
                        <FilterBlock label={t('FilterFieldLabel.TransactionType')} className="col-span-3">
                            <Select onChange={(selected) => handleValueCahnge('Side', selected)} value={params.Side} options={transactionSideField} />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.AggregateAble')}>
                            <Select
                                value={params.IsAggregated}
                                onChange={(value) => handleValueCahnge('IsAggregated', value)}
                                options={[
                                    { value: true, label: 'بله' },
                                    { value: false, label: 'خیر' },
                                ]}
                            />
                        </FilterBlock>
                    </>
                )}

                <div className="col-span-3">
                    <FilterActions isFilterBoxOpen={isFilterOpen} toggleFilterBox={toggleFilterBox} onSubmit={onSubmit} onClear={onClear} />
                </div>
            </div>
        </div>
    );
};

export default TurnOverFilter;
