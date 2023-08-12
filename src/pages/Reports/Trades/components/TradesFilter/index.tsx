import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { ITradeStateType } from '../..';

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

    const handleValueCahnge = (part: keyof ITradeStateType, value: any) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsOpenFilter(!isOpenFilter);

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect
                        setSelected={(selected) => handleValueCahnge('CustomerISIN', selected)}
                        selected={params.CustomerISIN || []}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect multiple selected={params.SymbolISIN} setSelected={(selected) => handleValueCahnge('SymbolISIN', selected)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Time')}>
                    <Select
                        onChange={(selected) => handleValueCahnge('Time', selected)}
                        value={params.Time}
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
                    <AdvancedDatepicker value={params.FromDate} onChange={(value) => handleValueCahnge('FromDate', value)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatepicker value={params.ToDate} onChange={(value) => handleValueCahnge('ToDate', value)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Side')}>
                    <Select
                        onChange={(selected) => handleValueCahnge('Side', selected)}
                        value={params.Side}
                        options={[
                            { value: 'Buy', label: t('orderSide.Buy') },
                            { value: 'Sell', label: t('orderSide.Sell') },
                        ]}
                    />
                </FilterBlock>
                {isOpenFilter ? (
                    <>
                        <FilterBlock label={t('FilterFieldLabel.CustomerType')} className="col-span-3">
                            <Select
                                onChange={(selected) => handleValueCahnge('CustomerType', selected)}
                                value={params.CustomerType}
                                options={[
                                    { value: 'Individual', label: t('CustomerType.Individual') },
                                    { value: 'Legal', label: t('CustomerType.Legal') },
                                ]}
                            />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.TradeStation')} className="col-span-3">
                            <Select
                                onChange={(selected) => handleValueCahnge('MyStationOnly', selected)}
                                value={params.MyStationOnly}
                                options={[
                                    { value: false, label: 'همه' },
                                    { value: true, label: 'ایستگاه من' },
                                ]}
                            />
                        </FilterBlock>
                    </>
                ) : (
                    <></>
                )}

                <div className="col-span-3">
                    <FilterActions isFilterBoxOpen={isOpenFilter} toggleFilterBox={toggleFilterBox} onSubmit={onSubmit} onClear={onClear} />
                </div>
            </div>
        </div>
    );
};

export default TradesFilter;
