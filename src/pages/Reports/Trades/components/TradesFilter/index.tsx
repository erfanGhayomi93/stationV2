import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { customerTypeFieldOptions, sideFieldOptions, stationFieldOptions, timeFieldOptions } from '../../constant';
import dayjs from 'dayjs';

interface IProps {
    params: ITradeStateType;
    setParams: React.Dispatch<React.SetStateAction<ITradeStateType>>;
    onSubmit: () => void;
    onClear: () => void;
}

const TradesFilter = ({ params, setParams, onSubmit, onClear }: IProps) => {
    //
    const { t } = useTranslation();
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const { CustomerISIN, CustomerType, SymbolISIN, Side, Time, ToDate, FromDate, MyStationOnly } = params;

    const handleValueChange = <T extends keyof ITradeStateType>(part: T, value: ITradeStateType[T]) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsOpenFilter(!isOpenFilter);

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect setSelected={(selected) => handleValueChange('CustomerISIN', selected)} selected={CustomerISIN || []} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect multiple selected={SymbolISIN} setSelected={(selected) => handleValueChange('SymbolISIN', selected)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Time')}>
                    <Select onChange={(selected) => handleValueChange('Time', selected)} value={Time} options={timeFieldOptions} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')}>
                    <AdvancedDatepicker value={FromDate} onChange={(value) => handleValueChange('FromDate', dayjs(value).format('YYYY-MM-DDT00:00:00'))} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatepicker value={ToDate} onChange={(value) => handleValueChange('ToDate', dayjs(value).format('YYYY-MM-DDT23:59:59'))} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Side')}>
                    <Select onChange={(selected) => handleValueChange('Side', selected)} value={Side} options={sideFieldOptions} />
                </FilterBlock>
                {isOpenFilter && (
                    <>
                        <FilterBlock label={t('FilterFieldLabel.CustomerType')} className="col-span-3">
                            <Select
                                onChange={(selected) => handleValueChange('CustomerType', selected)}
                                value={CustomerType}
                                options={customerTypeFieldOptions}
                            />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.TradeStation')} className="col-span-3">
                            <Select
                                onChange={(selected) => handleValueChange('MyStationOnly', selected)}
                                value={MyStationOnly}
                                options={stationFieldOptions}
                            />
                        </FilterBlock>
                    </>
                )}

                <div className="col-span-3">
                    <FilterActions isFilterBoxOpen={isOpenFilter} toggleFilterBox={toggleFilterBox} onSubmit={onSubmit} onClear={onClear} />
                </div>
            </div>
        </div>
    );
};

export default TradesFilter;
