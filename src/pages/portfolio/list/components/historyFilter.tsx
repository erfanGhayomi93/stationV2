import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import FilterBlock from 'src/common/components/FilterBlock';
import Select from 'src/common/components/Select';
import { timeFieldOptions } from 'src/pages/Reports/Trades/constant';
import { typesOption } from '../constant';
import AdvancedDatePicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import dayjs from 'dayjs';

type THistoryFilterCo = {
    onSubmit: () => void;
    onClear: () => void;
    filterData: THistoryFilter;
    setFilterData: Dispatch<SetStateAction<THistoryFilter>>;
};

export const HistoryFilter: FC<THistoryFilterCo> = ({ onSubmit, onClear, filterData, setFilterData }) => {
    const { t } = useTranslation();

    const { time, fromDate, toDate, type } = filterData;

    const handleValueChange = <T extends keyof THistoryFilter>(part: T, value: THistoryFilter[T]) => {
        setFilterData((pre) => ({ ...pre, [part]: value }));
    };

    const onDatePickerChange = (field: 'fromDate' | 'toDate', value: Date) => {
        handleValueChange('time', 'custom');
        handleValueChange(field, dayjs(value).format(`YYYY-MM-DDT${field === 'fromDate' ? '00:00:00' : '23:59:59'}`));
    };

    return (
        <div className="w-full h-full bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-6 py-2">
            <div className="w-full h-full grid grid-cols-14 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Time')}>
                    <Select onChange={(selected) => handleValueChange('time', selected)} value={time} options={timeFieldOptions} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')} className="col-span-3">
                    <AdvancedDatePicker value={fromDate} onChange={(value) => onDatePickerChange('fromDate', value)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')} className="col-span-3">
                    <AdvancedDatePicker value={toDate} onChange={(value) => onDatePickerChange('toDate', value)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.TransactionType')} className="col-span-4 text-right">
                    <Select onChange={(selected) => handleValueChange('type', selected)} value={type} options={typesOption} />
                </FilterBlock>

                <div className="flex gap-1 col-span-3">
                    <button
                        onClick={onSubmit}
                        className="bg-L-primary-50 w-[96px] block dark:bg-D-primary-50 py-1 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded"
                    >
                        {t('Action_Button.Search')}
                    </button>

                    <button
                        onClick={onClear}
                        className="bg-L-primary-100  whitespace-nowrap w-[72px] dark:bg-D-primary-100 py-1 border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 rounded"
                    >
                        {t('Action_Button.Remove')}
                    </button>
                </div>
            </div>
        </div>
    );
};
