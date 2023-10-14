import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FilterBlock from 'src/common/components/FilterBlock'
import Select from 'src/common/components/Select'
import { timeFieldOptions } from 'src/pages/Reports/Trades/constant'
import { initHistoryFilter, typesOption } from '../constant'
import AdvancedDatePicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker'
import dayjs from 'dayjs'
import { format } from 'path'

type THistoryFilterCo = {
    onSubmit: () => void;
    onClear: () => void;
    filterData: THistoryFilter;
    setFilterData: Dispatch<SetStateAction<THistoryFilter>>
}

export const HistoryFilter: FC<THistoryFilterCo> = ({
    onSubmit,
    onClear,
    filterData,
    setFilterData
}) => {
    const { t } = useTranslation()


    const { time, fromDate, toDate, type } = filterData

    const handleValueChange = <T extends keyof THistoryFilter>(part: T, value: THistoryFilter[T]) => {
        setFilterData((pre) => ({ ...pre, [part]: value }));
    };

    return (
        <div className='w-full h-full bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-6 py-2'>
            <div className='w-full h-full grid grid-cols-14 gap-4'>
                <FilterBlock label={t('FilterFieldLabel.Time')}>
                    <Select onChange={(selected) => handleValueChange('time', selected)} value={time} options={timeFieldOptions} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')}>
                    <AdvancedDatePicker value={fromDate} onChange={(value) => handleValueChange('fromDate', dayjs(value).format())} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatePicker value={toDate} onChange={(value) => handleValueChange('toDate', dayjs(value).format())} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.TransactionType')} className='col-span-4'>
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
    )
}
