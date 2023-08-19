// import { useAppDispatch } from 'app/hooks';
import { Dispatch, SetStateAction } from "react"
import clsx from 'clsx';
// import { setCalenderDateTab } from 'features/tabSlice';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';


type CalenderDateTabProps = {
    activeTab: calenderDateTab;
    setActiveTab: Dispatch<SetStateAction<calenderDateTab>>;
    setDateStep: Dispatch<SetStateAction<number>>
}

const CalenderDateTab = ({ activeTab, setDateStep, setActiveTab }: CalenderDateTabProps) => {
    const { t } = useTranslation();

    // const dispatch = useAppDispatch();

    const onChangeTab = (name: typeof activeTab) => {
        setActiveTab(name)
        setDateStep(0);
    };

    const dateTabs: Array<{ id: 'day' | 'week' | "month" | "year"; title: string, testId: string }> = [
        { id: 'day', title: 'tab_day', testId: "tab_day_button" },
        { id: 'week', title: 'tab_week', testId: "tab_week_button" },
        { id: 'month', title: 'tab_month', testId: "tab_month_button" },
        { id: 'year', title: 'tab_year', testId: "tab_year_button" },
    ];

    return (
        <div className={clsx('flex bg-L-gray-200 dark:bg-D-gray-200 py-2 px-1 rounded-lg')}>
            {dateTabs.map(tab => (
                <button
                    role="button"
                    key={tab.id}
                    data-testid={tab.testId}
                    type='button'
                    onClick={() => onChangeTab(tab.id)}
                    className={clsx(
                        'text-sm flex flex-1 items-center justify-center relative px-2 py-2 rounded-md',
                        activeTab === tab.id ? 'font-medium text-L-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic' : 'text-L-gray-500 dark:text-D-gray-500'
                    )}
                >
                    {t('dates.' + tab.id)}
                </button>
            ))}
        </div>
    );
};

export default memo(CalenderDateTab);