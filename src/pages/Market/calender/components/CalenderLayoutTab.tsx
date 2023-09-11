import clsx from 'clsx';
import { Dispatch, SetStateAction, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridLayoutSVG, ListLayoutSVG } from 'src/common/icons';


type CalenderLayoutTabProps = {
    activeTab: calenderLayoutTab;
    setActiveTab: Dispatch<SetStateAction<calenderLayoutTab>>
}

const CalenderLayoutTab = ({ activeTab, setActiveTab }: CalenderLayoutTabProps) => {
    const { t } = useTranslation();


    const onChangeTab = (name: typeof activeTab) => {
        setActiveTab(name)
    };

    const dateTabs: Array<{ id: calenderLayoutTab; title: string, testId: string }> = [
        { id: 'list', title: 'tab_list', testId: "tab_list_button" },
        { id: 'grid', title: 'tab_grid', testId: "tab_grid_button" },
    ];

    return (
        <div className={clsx('flex bg-L-gray-200 dark:bg-D-gray-200 py-2 px-1 rounded-lg')}>
            {dateTabs.map(tab =>
                <button
                    role="button"
                    key={tab.id}
                    data-testid={tab.testId}
                    type='button'
                    onClick={() => onChangeTab(tab.id)}
                    className={clsx(
                        'text-sm flex flex-1 items-center justify-center relative px-2 py-[5px] rounded-md',
                        activeTab === tab.id ? 'font-medium text-L-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic' : 'text-L-gray-500 dark:text-D-gray-500'
                    )}
                >
                    {tab.id === "list" ? <ListLayoutSVG /> : <GridLayoutSVG />}
                </button>
            )}
        </div>
    );
};

export default memo(CalenderLayoutTab);