import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdvancedDatePicker, { DateType } from 'src/common/components/AdvancedDatePicker';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import MultiSelect from 'src/common/components/MultiSelect';
import Select from 'src/common/components/Select';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { FilterMinusIcon, FilterPlusIcon } from 'src/common/icons';

const TradesFilter = () => {
    //
    const { t } = useTranslation();
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
    const [date, setDate] = useState<DateType>('');
    console.log(date);
    return (
        <div className="bg-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-10 gap-4">
                <FilterBlock label="مشتری" className="col-span-2">
                    <CustomerMegaSelect onChange={(v) => console.log(v)} />
                </FilterBlock>
                <FilterBlock label="نماد" className="col-span-2">
                    <SymbolMiniSelect setSelected={() => {}} selected={[]} />
                </FilterBlock>
                <FilterBlock label="از تاریخ :">
                    <AdvancedDatePicker
                        value={date}
                        onChange={(selectedDates) => setDate(selectedDates)}
                        className="text-L-gray-500 dark:text-D-gray-500 py-1.5 w-full duration-250 dark:focus-visible:border-D-infoo-100 focus-visible:border-L-info-100"
                    />
                </FilterBlock>
                <FilterBlock label="تا تاریخ :">
                    <AdvancedDatePicker
                        value={date}
                        onChange={(selectedDates: any) => setDate(selectedDates)}
                        className="text-L-gray-500 dark:text-D-gray-500 py-1.5 w-full duration-250 dark:focus-visible:border-D-infoo-100 focus-visible:border-L-info-100"
                    />
                </FilterBlock>
                <FilterBlock label="سمت :">
                    <MultiSelect
                        onChange={(selected) => {}}
                        value={undefined}
                        // value={side}
                        options={[
                            { value: 'buy', label: t('orderSide.buy') },
                            { value: 'sell', label: t('orderSide.sell') },
                        ]}
                    />
                </FilterBlock>
                <FilterBlock label="زمان :">
                    <Select
                        onChange={(selected) => {}}
                        value={undefined}
                        // value={side}
                        options={[
                            { value: 'day', label: t('timeSheet.day') },
                            { value: 'week', label: t('timeSheet.week') },
                            { value: 'month', label: t('timeSheet.month') },
                            { value: 'year', label: t('timeSheet.year') },
                            { value: 'custom', label: t('timeSheet.custom') },
                        ]}
                    />
                </FilterBlock>
                <div className="col-span-2">
                    <FilterAction />
                </div>
            </div>
        </div>
    );

    function FilterAction() {
        return (
            <div className="flex gap-1">
                <button onClick={() => setIsOpenFilter(!isOpenFilter)} className="p-2 border border-gray-400 rounded-md max-w-[40px]">
                    {isOpenFilter ? <FilterMinusIcon /> : <FilterPlusIcon />}
                </button>
                <button
                    onClick={() => {}}
                    className="bg-L-primary-50 w-[96px] dark:bg-D-primary-50 py-1.5 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded"
                >
                    جستجو
                </button>

                <button
                    onClick={() => {}}
                    className="bg-L-primary-100  whitespace-nowrap w-[72px] dark:bg-D-primary-100 py-1.5 border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 rounded"
                >
                    حذف
                </button>
            </div>
        );
    }
};

export default TradesFilter;

const FilterBlock = ({ children, label, className }: any) => {
    return (
        <div className={clsx('flex gap-2 items-center text-1.4 grow', className)}>
            <span className="text-1.3 pr-0.5 text-L-gray-500 dark:text-D-gray-700">{label}</span>
            <div className="flex-1">{children}</div>
        </div>
    );
};
