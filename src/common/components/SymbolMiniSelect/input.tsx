import clsx from 'clsx';
import { FC, memo, useContext, useEffect, useRef } from 'react';
import { PlusIcon, SearchIcon, SearchPlusIcon } from 'src/common/icons';
import Combo from '../ComboSelect';
import { ComboSelectContext } from '../ComboSelect/context';

interface IInputSearchType {
    loading: boolean;
    isBigSize?: boolean;
    setMin: (x: boolean) => void;
}

const InputSearch: FC<IInputSearchType> = ({ loading, isBigSize, setMin }) => {
    const {
        setPanel,
        setValue,
        setPanelContent,
        clearSelected,
        state: { value, selections, showPanel, panelContent, multiple },
    } = useContext(ComboSelectContext);

    const searchRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        setValue('');
        !multiple && clearSelected();
        searchRef.current?.focus();
        setMin(true);
    };

    const handleReset = () => {
        searchRef.current?.focus();
        setPanelContent('DATA');
    };

    const handleSetPanelContent = () => {
        setPanel(true);
        setPanelContent('SELECT');
    };

    return (
        <div
            className={clsx(
                'bg-L-basic dark:bg-D-basic border dark:border-D-gray-400 border-L-gray-400 rounded-md flex items-center gap-1 pl-1 text-1.3 duration-250 dark:focus-within:border-D-info-100 focus-within:border-L-info-100',
                {
                    'h-10': !!isBigSize,
                    'h-8': !isBigSize,
                },
            )}
        >
            <div className="flex items-center gap-1 relative grow">
                <div className="pr-2">
                    <SearchIcon className="text-L-gray-500 w-[1.1rem] h-[1.1rem] dark:text-D-gray-500" />
                </div>
                <Combo.SearchBox
                    ref={searchRef}
                    className="h-full text-xs grow w-full px-1 outline-none truncate pl-8 border-b border-transparent  bg-L-basic dark:bg-D-basic text-L-gray-700 dark:text-D-gray-700  duration-150 "
                    onKeyDown={(e) => setPanel(e.key !== 'Escape' ? true : false)}
                    onClick={() => handleReset()}
                    onFocus={() => setPanel(true)}
                />
                <div
                    onClick={() => handleClear()}
                    className={clsx(
                        ' scale-[0.6] rounded-full absolute bg-L-gray-400 dark:bg-D-gray-400 left-0',
                        (!value?.length || loading) && 'opacity-0',
                    )}
                >
                    <PlusIcon className="rotate-45 text-white " />
                </div>
            </div>
            {multiple ? (
                <>
                    <hr className="bg-L-gray-400 dark:bg-D-gray-400  w-[1px] ml-1  h-7" />
                    <div className="flex justify-between items-center gap-2 cursor-pointer" onClick={() => handleSetPanelContent()}>
                        {/* <span hidden={!selections?.length} className="whitespace-nowrap bg-L-gray-300 dark:bg-D-gray-300 p-1 rounded-lg px-2 text-1.2">
                        {selections?.length && selections?.length < 10 ? selections?.length : '+9'} مورد انتخاب شده
                    </span> */}

                        <div
                            className={clsx(
                                'bg-L-gray-300 dark:bg-D-gray-300 p-1 rounded-lg flex items-center justify-center relative',
                                panelContent === 'SELECT' && showPanel && 'bg-L-primary-100',
                            )}
                        >
                            <SearchPlusIcon
                                className={clsx(
                                    'w-[1.1rem] h-[1.1rem]',
                                    panelContent === 'SELECT' && showPanel ? 'text-L-primary-50' : 'text-L-gray-500 dark:text-D-gray-500',
                                )}
                            />
                            {selections?.length ? (
                                <span className="ltr absolute flex items-center justify-center aspect-square w-[18px] -top-1 -right-2 text-1.1 leading-none text-white bg-L-primary-50 rounded-full">
                                    {selections?.length && selections?.length < 10 ? selections?.length : '+9'}
                                </span>
                            ) : null}
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default memo(InputSearch);
