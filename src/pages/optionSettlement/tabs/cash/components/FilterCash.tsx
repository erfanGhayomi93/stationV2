import dayjs from 'dayjs';
import { t } from 'i18next';
import { SetStateAction, useState } from 'react';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import MultiSelect from 'src/common/components/MultiSelect';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { timeFieldOptions } from 'src/pages/Reports/Trades/constant';

type TProps = {
    formValues: Record<string, any>;
    setFormValues: SetStateAction<{}>;
    onSubmit: () => void;
    onClear: () => void;
};

const FilterCash = ({ formValues, onSubmit, onClear, setFormValues }: TProps) => {
    //
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

    const handleValueChange = <T extends keyof ITradeStateType>(part: T, value: ITradeStateType[T]) => {
        // setParams((pre) => ({ ...pre, [part]: value }));
    };
    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect selected={[]} setSelected={() => {}} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Time')} className="col-span-2">
                    <Select onChange={(selected) => handleValueChange('Time', selected)} options={timeFieldOptions} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')} className="col-span-2">
                    <AdvancedDatepicker value={''} onChange={(value) => handleValueChange('FromDate', dayjs(value).format('YYYY-MM-DDT00:00:00'))} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')} className="col-span-2">
                    <AdvancedDatepicker value={''} onChange={(value) => handleValueChange('ToDate', dayjs(value).format('YYYY-MM-DDT23:59:59'))} />
                </FilterBlock>
                {isFilterBoxOpen && (
                    <>
                        <FilterBlock label={t('وضعیت قرارداد')} className="col-span-3">
                            <Select options={[]} onChange={() => {}} />
                        </FilterBlock>
                        <FilterBlock label={t('نوع اعمال')} className="col-span-4">
                            <MultiSelect options={[]} onChange={() => {}} />
                        </FilterBlock>
                        <FilterBlock label={t('وضعیت درخواست')} className="col-span-3">
                            <MultiSelect options={[]} onChange={() => {}} />
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

export default FilterCash;
