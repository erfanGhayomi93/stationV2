import SubmitFilterBox from './SubmitFilterBox';
import CloseFilterBoxBtn from '../Buttons/CloseFilterBoxBtn';

type Props = {
    onCloseFilterBoxClick: () => void;
    onSubmit: () => void;
    fieldDefs: React.ReactNode;
    onClear: () => void;
};

const FilterBox = ({ onCloseFilterBoxClick, fieldDefs, onSubmit, onClear }: Props) => {
    //

    return (
        <div className="bg-white dark:bg-D-gray-300 dark:text-white p-2 flex flex-col gap-2 rounded-lg justify-between h-full">
            <div className="flex justify-end">
                <CloseFilterBoxBtn onClick={onCloseFilterBoxClick} />
            </div>
            <div className="flex-1 w-full pl-1 flex flex-col overflow-auto">{fieldDefs}</div>
            <div className="mt-auto w-full">
                <SubmitFilterBox onClearClick={onClear} onSubmitClick={onSubmit} />
            </div>
        </div>
    );
};

export default FilterBox;
