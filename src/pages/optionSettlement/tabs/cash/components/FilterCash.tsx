import dayjs from 'dayjs';
import { t } from 'i18next';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import FilterBlock from 'src/common/components/FilterBlock';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { timeFieldOptions } from 'src/pages/Reports/Trades/constant';

const FilterCash = () => {
    //
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
                    <Select  onChange={(selected) => handleValueChange('Time', selected)} options={timeFieldOptions} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')} className="col-span-2">
                    <AdvancedDatepicker value={''} onChange={(value) => handleValueChange('FromDate', dayjs(value).format('YYYY-MM-DDT00:00:00'))} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')} className="col-span-2">
                    <AdvancedDatepicker value={''} onChange={(value) => handleValueChange('ToDate', dayjs(value).format('YYYY-MM-DDT23:59:59'))} />
                </FilterBlock>
                <div className="flex items-center col-span-4 pr-8">
                    <button
                        data-cy="basket-filter-button-submit"
                        // onClick={() => handleFilter(dataFilter)}
                        className="bg-L-primary-50 dark:bg-D-primary-50 py-1 px-10 ml-4 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded"
                    >
                        جستجو
                    </button>
                    <button
                        data-cy="basket-filter-button-default"
                        // onClick={handleDefaultState}
                        className="bg-L-primary-100 dark:bg-D-primary-100 py-1 px-4 border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 rounded"
                    >
                        پیش فرض
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterCash;
