import dayjs, { ManipulateType } from 'dayjs';
import { t } from 'i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import MultiSelect from 'src/common/components/MultiSelect';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { timeFieldOptions } from 'src/pages/Reports/Trades/constant';
import { PandLStatusOptions, RequestStatusOptions, SettlementTypeOptions, initialFilterState } from 'src/pages/optionSettlement/constants';

type TProps = {
    formValues: Record<string, any>;
    setFormValues: Dispatch<SetStateAction<any>>;
    onSubmit: () => void;
    onClear: () => void;
};

const FilterSettlement = ({ formValues, onSubmit, onClear, setFormValues }: TProps) => {
    //
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

    const onTimeChangeHandler = (time: string | undefined) => {
        if (!time || time === 'custom') return;

        const EndDate = dayjs().format('YYYY-MM-DDT23:59:59');
        const StartDate = dayjs()
            .subtract(1, time as ManipulateType)
            .format('YYYY-MM-DDT00:00:00');

        setFormValues((pre: typeof initialFilterState) => ({
            ...pre,
            StartDate,
            EndDate,
        }));
    };

    const filterValueSetter = (field: string, value: any) => {
        setFormValues((prev: any) => ({ ...prev, [field]: value }));
    };

    const changeDateToCustome = () => setFormValues((prev: typeof initialFilterState) => ({ ...prev, Time: 'custom' }));

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect
                        selected={[formValues?.SymbolISIN]}
                        setSelected={(selected) => filterValueSetter('SymbolISIN', selected[0]?.symbolISIN)}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Time')} className="col-span-2">
                    <Select
                        value={formValues?.Time}
                        onChange={(selected) => {
                            filterValueSetter('Time', selected);
                            onTimeChangeHandler(selected);
                        }}
                        options={timeFieldOptions}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')} className="col-span-2">
                    <AdvancedDatepicker
                        value={formValues?.StartDate}
                        onChange={(value) => {
                            changeDateToCustome();
                            filterValueSetter('StartDate', dayjs(value).format('YYYY-MM-DDT00:00:00'));
                        }}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')} className="col-span-2">
                    <AdvancedDatepicker
                        value={formValues?.EndDate}
                        onChange={(value) => {
                            changeDateToCustome();
                            filterValueSetter('EndDate', dayjs(value).format('YYYY-MM-DDT23:59:59'));
                        }}
                    />
                </FilterBlock>
                {isFilterBoxOpen && (
                    <>
                        <FilterBlock label={t('وضعیت قرارداد')} className="col-span-3">
                            <Select
                                value={formValues?.PandLStatus}
                                options={PandLStatusOptions}
                                onChange={(selected) => filterValueSetter('PandLStatus', selected)}
                            />
                        </FilterBlock>
                        <FilterBlock label={t('نوع اعمال')} className="col-span-4">
                            <MultiSelect
                                value={formValues?.SettlementType}
                                options={SettlementTypeOptions}
                                onChange={(selected) => filterValueSetter('SettlementType', selected)}
                            />
                        </FilterBlock>
                        <FilterBlock label={t('وضعیت درخواست')} className="col-span-4">
                            <MultiSelect
                                value={formValues?.RequestStatus}
                                options={RequestStatusOptions}
                                onChange={(selected) => filterValueSetter('RequestStatus', selected)}
                            />
                        </FilterBlock>
                    </>
                )}
                <FilterActions
                    onSubmit={onSubmit}
                    isFilterBoxOpen={isFilterBoxOpen}
                    onClear={onClear}
                    toggleFilterBox={() => setIsFilterBoxOpen((prev) => !prev)}
                />
            </div>
        </div>
    );
};

export default FilterSettlement;
