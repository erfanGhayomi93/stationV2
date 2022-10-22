import clsx from 'clsx';
import { FC, memo, useContext, useRef } from 'react';
import { PlusIcon, SearchIcon } from 'src/common/icons';
import Combo from '../ComboSelect';
import { ComboSelectContext } from '../ComboSelect/context';

interface IInputSearchType {
    loading: boolean;
}

const InputSearch: FC<IInputSearchType> = ({ loading }) => {
    const {
        setPanel,
        setValue,
        setPanelContent,
        clearSelected,
        state: { value },
    } = useContext(ComboSelectContext);

    const searchRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        setValue('');
        clearSelected();
        searchRef.current?.focus();
    };

    const handleReset = () => {
        searchRef.current?.focus();
        setPanelContent('DATA');
    };

    return (
        <div className="bg-L-basic dark:bg-D-basic border dark:border-D-gray-350 border-L-gray-350 rounded-md flex items-center gap-1 pl-1 text-1.3 duration-250 dark:focus-within:border-D-secondary-50 focus-within:border-L-secondary-50 ">
            <div className="flex items-center gap-1 relative grow">
                <div className="pr-2">
                    <SearchIcon className="text-L-gray-400 dark:text-D-gray-400" />
                </div>
                <Combo.SearchBox
                    ref={searchRef}
                    className="py-1.5 grow w-full px-1 outline-none truncate pl-8 border-b border-transparent  bg-L-basic dark:bg-D-basic text-L-gray-500 dark:text-D-gray-500  duration-150 "
                    onKeyDown={(e) => setPanel(e.key !== 'Escape' ? true : false)}
                    onClick={() => handleReset()}
                />
                <div
                    onClick={() => handleClear()}
                    className={clsx(
                        ' scale-[0.6] rounded-full absolute bg-L-gray-350 dark:bg-D-gray-350 left-0',
                        (!value?.length || loading) && 'opacity-0',
                    )}
                >
                    <PlusIcon className="rotate-45 text-white " />
                </div>
            </div>
        </div>
    );
};

export default memo(InputSearch);
