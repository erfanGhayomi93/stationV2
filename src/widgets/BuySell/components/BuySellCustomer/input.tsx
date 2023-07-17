import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { FC, MouseEvent, useContext, useEffect, useRef } from 'react';
import Combo from 'src/common/components/ComboSelect';
import { ComboSelectContext } from 'src/common/components/ComboSelect/context';
import { PlusIcon, SearchIcon, SpinnerIcon, UserCheckIcon } from 'src/common/icons';
import { useAppValues } from 'src/redux/hooks';

interface IInputSearchType {
    loading: boolean;
    selectionCount: number;
}
const InputSearch: FC<IInputSearchType> = ({ loading, selectionCount }) => {
    const {
        setPanel,
        setValue,
        setPanelContent,
        clearSelected,
        state: { selections, value, panelContent, showPanel },
    } = useContext(ComboSelectContext);

    const {
        option: { selectedCustomers },
    } = useAppValues();

    const searchRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        setValue('');
        searchRef.current?.focus();
    };
    useEffect(() => {
        if (selectedCustomers.length === 0 && selections?.length !== 0) {
            clearSelected();
            handleClear();
        }
    }, [selectedCustomers]);

    const handleReset = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        searchRef.current?.focus();
        setPanelContent('DATA');
    };

    const handleSetPanelContent = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setPanel(true);
        setPanelContent('SELECT');
    };

    return (
        <div className="bg-L-basic dark:bg-D-basic border duration-250 duration-250 dark:focus-within:border-D-secondary-50 focus-within:border-L-secondary-50 border-L-gray-350 dark:border-D-gray-350 rounded-md flex items-center gap-2 pl-3 ">
            <div className="pr-2">
                <SearchIcon className="text-L-gray-400 dark:text-D-gray-400" />
            </div>
            <div className="flex items-center w-full relative">
                <Combo.SearchBox
                    ref={searchRef}
                    className="py-2 bg-L-basic dark:bg-D-basic w-full px-1 outline-none border-b border-transparent duration-150 "
                    onKeyDown={(e) => setPanel(e.key !== 'Escape' ? true : false)}
                    onClick={(e) => handleReset(e)}

                    // onDoubleClick={(e) => setPanel(true)}
                />
            </div>
            <div
                onClick={() => handleClear()}
                hidden={!value?.length || loading}
                className=" scale-[0.6] rounded-full bg-L-gray-350 dark:bg-D-gray-350"
            >
                <PlusIcon className="rotate-45 text-white " />
            </div>
            <div hidden={!loading}>
                <SpinnerIcon className="text-L-gray-400 dark:text-D-gray-400" />
            </div>
            <hr className="bg-L-gray-350 dark:bg-D-gray-350  w-[1px] ml-1  h-7" />
            <button
                type={'button'}
                disabled={!selectionCount}
                className={clsx('flex justify-between items-center gap-2 cursor-pointer  z-30 disabled:opacity-40')}
                onClick={(e) => handleSetPanelContent(e)}
            >
                <Tippy content="مشتریان انتخاب شده" className="text-xs">
                    <div
                        className={clsx(
                            'bg-L-gray-200 dark:bg-D-gray-200 p-1 rounded-lg flex items-center justify-center relative ',
                            panelContent === 'SELECT' && showPanel && 'bg-L-primary-100',
                        )}
                    >
                        <UserCheckIcon
                            className={clsx(panelContent === 'SELECT' && showPanel ? 'text-L-primary-50' : 'text-L-gray-400 dark:text-D-gray-400')}
                            width={18}
                            height={18}
                        />
                        <span
                            className={clsx(
                                selectionCount
                                    ? 'absolute flex items-center justify-center aspect-square w-[18px]   -top-1 -right-2 text-1.1 leading-none text-white bg-L-primary-50 rounded-full'
                                    : 'hidden',
                            )}
                        >
                            {selectionCount ? (selectionCount < 10 ? selectionCount : '9+') : ''}
                        </span>
                    </div>
                </Tippy>
            </button>
        </div>
    );
};
export default InputSearch;
