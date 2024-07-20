import { useTranslation } from 'react-i18next';
// import { FilterMinusIcon, FilterPlusIcon } from 'src/common/icons';

interface IProps {
    onSubmit: () => void;
    onClear: () => void;
    toggleFilterBox: () => void;
    isFilterBoxOpen: boolean;
}
const FilterActions = ({ onSubmit, onClear, toggleFilterBox, isFilterBoxOpen }: IProps) => {
    const { t } = useTranslation();
    return (
        <div className="flex gap-1 col-span-3">
            {/* <button onClick={toggleFilterBox} className="p-2 border border-gray-400 rounded-md max-w-[40px]">
                {isFilterBoxOpen ? <FilterMinusIcon /> : <FilterPlusIcon />}
            </button> */}
            <button
                onClick={onSubmit}
                className="bg-L-primary-50 w-[96px] dark:bg-D-primary-50 py-1 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded"
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
    );
};

export default FilterActions;
