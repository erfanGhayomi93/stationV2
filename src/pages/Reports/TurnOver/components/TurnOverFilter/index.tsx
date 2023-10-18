import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomerMiniSelect from 'src/common/components/CustomerMiniSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import { timeFieldOptions } from 'src/pages/Reports/Trades/constant';
import { transactionSideField } from '../../constant';
import dayjs from 'dayjs';

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

    const handleValueChange = <T extends keyof ITurnOverStateType>(part: T, value: ITurnOverStateType[T]) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsFilterOpen(!isFilterOpen);

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMiniSelect
                        selected={params.CustomerISIN}
                        setSelected={(selected) => handleValueChange('CustomerISIN', selected)}
                        filterCustomerType={false}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect selected={params.SymbolISIN} setSelected={(selected) => handleValueChange('SymbolISIN', selected)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Time')}>
                    <Select onChange={(selected) => handleValueChange('Time', selected)} value={params.Time} options={timeFieldOptions} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')}>
                    <AdvancedDatepicker
                        value={params.DateFrom}
                        onChange={(value) => handleValueChange('DateFrom', dayjs(value).format('YYYY-MM-DDT00:00:00'))}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatepicker
                        value={params.DateTo}
                        onChange={(value) => handleValueChange('DateTo', dayjs(value).format('YYYY-MM-DDT23:59:59'))}
                    />
                </FilterBlock>
                {isFilterOpen && (
                    <>
                        <FilterBlock label={t('FilterFieldLabel.TransactionType')} className="col-span-3">
                            <Select onChange={(selected) => handleValueChange('Side', selected)} value={params.Side} options={transactionSideField} />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.AggregateAble')}>
                            <Select
                                value={params.IsAggregated}
                                onChange={(value) => handleValueChange('IsAggregated', value)}
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
