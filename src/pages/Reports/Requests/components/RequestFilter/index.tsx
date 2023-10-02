import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';

import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { customerTypeFieldOptions, sideFieldOptions, stationFieldOptions } from 'src/pages/Reports/Trades/constant';
import TradeInput from 'src/widgets/BuySell/components/Input';

interface IProps {
    params: IOfflineRequestStateType;
    setParams: React.Dispatch<React.SetStateAction<IOfflineRequestStateType>>;
    onSubmit: () => void;
    onClear: () => void;
}

const RequestFilter = ({ onClear, onSubmit, params, setParams }: IProps) => {
    //
    const { t } = useTranslation();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleValueChange = (part: keyof IOfflineRequestStateType, value: any) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsFilterOpen(!isFilterOpen);

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.RequestNO')}  className="col-span-3">
                    <div className="w-full h-8 flex text-xs items-center rounded-md border border-L-gray-400 dark:border-D-gray-400 overflow-hidden dark:focus-within:border-L-info-100 focus-within:border-L-info-100">
                        <TradeInput value={Number(params.RequestNo)} onChange={(value) => handleValueChange('RequestNo', value)} />
                    </div>
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.CustomerType')}  className="col-span-3">
                    <Select
                        options={customerTypeFieldOptions}
                        value={params.CustomerType}
                        onChange={(value) => handleValueChange('CustomerType', value)}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Customer')}  className="col-span-3">
                    <CustomerMegaSelect selected={params.CustomerISIN} setSelected={(value) => console.log('CustomerISIN', value)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')}  className="col-span-3">
                    <SymbolMiniSelect multiple selected={params.SymbolISIN} setSelected={(value) => handleValueChange('SymbolISIN', value)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')} >
                    <AdvancedDatepicker onChange={(value) => handleValueChange('FromDate', value)} value={params.FromDate} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')} >
                    <AdvancedDatepicker onChange={(value) => handleValueChange('ToDate', value)} value={params.ToDate} />
                </FilterBlock>
                {isFilterOpen && (
                    <>
                        <FilterBlock label={t('FilterFieldLabel.Side')} >
                            <Select value={params.Side} onChange={(value) => handleValueChange('Side', value)} options={sideFieldOptions} />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.Market')} >
                            <Select onChange={() => {}} options={[]} />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.MarketUnit')} >
                            <Select onChange={() => {}} options={[]} />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.TradeStation')}  className="col-span-3">
                            <Select value={params.State} onChange={(value) => handleValueChange('State', value)} options={stationFieldOptions} />
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

export default RequestFilter;
