import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMarketUnit } from 'src/app/queries/symbol';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';

import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { marketUnitTypeOption } from 'src/constant/global';
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

    const { data: marketUnitData } = useMarketUnit();

    const marketUnitOption = useMemo(() => {
        if (!marketUnitData?.result) return [];

        const options = marketUnitData?.result
            .filter((item) => !['067', '068', '069', '070'].includes(item.code))
            .map((item) => ({
                value: item.type,
                label: item.title,
            }));

        return [{ value: '', label: t('common.all') }, ...options];
    }, [marketUnitData]);

    const handleValueChange = <T extends keyof IOfflineRequestStateType>(part: T, value: IOfflineRequestStateType[T]) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsFilterOpen(!isFilterOpen);

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.RequestNO')} className="col-span-3">
                    <div className="w-full h-8 flex text-xs items-center rounded-md border border-L-gray-400 dark:border-D-gray-400 overflow-hidden dark:focus-within:border-L-info-100 focus-within:border-L-info-100">
                        <TradeInput value={Number(params.RequestNo)} onChange={(value) => handleValueChange('RequestNo', value ? value + '' : '')} />
                    </div>
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.CustomerType')} className="col-span-3">
                    <Select
                        options={customerTypeFieldOptions}
                        value={params.CustomerType}
                        onChange={(value) => handleValueChange('CustomerType', value)}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect selected={params.CustomerISIN} setSelected={(value) => handleValueChange('CustomerISIN', value)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect multiple selected={params.SymbolISIN} setSelected={(value) => handleValueChange('SymbolISIN', value)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')}>
                    <AdvancedDatepicker
                        onChange={(value) => handleValueChange('FromDate', dayjs(value).format('YYYY-MM-DDT00:00:00'))}
                        value={params.FromDate}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatepicker
                        onChange={(value) => handleValueChange('ToDate', dayjs(value).format('YYYY-MM-DDT23:59:59'))}
                        value={params.ToDate}
                    />
                </FilterBlock>
                {isFilterOpen && (
                    <>
                        <FilterBlock label={t('FilterFieldLabel.Side')}>
                            <Select value={params.Side} onChange={(value) => handleValueChange('Side', value)} options={sideFieldOptions} />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.Market')}>
                            <Select
                                value={params.MarketType}
                                onChange={(value) => handleValueChange('MarketType', value)}
                                options={marketUnitTypeOption}
                            />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.MarketUnit')} className="col-span-4">
                            <Select
                                value={params.MarketUnit}
                                onChange={(value) => handleValueChange('MarketUnit', value)}
                                options={marketUnitOption}
                            />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.TradeStation')} className="col-span-3">
                            <Select
                                value={params.MyStationOnly}
                                onChange={(value) => handleValueChange('MyStationOnly', value)}
                                options={stationFieldOptions}
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

export default RequestFilter;
