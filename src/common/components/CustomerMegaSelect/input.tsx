import clsx from 'clsx';
import { FC, useContext, useRef, useState } from 'react';
import { PlusIcon, SearchIcon, SpinnerIcon, UserCheckIcon } from 'src/common/icons';
import Combo from '../ComboSelect';
import { ComboSelectContext } from '../ComboSelect/context';

interface IInputSearchType {
    loading: boolean;
}
const InputSearch: FC<IInputSearchType> = ({ loading }) => {
    const [Kbd, setKbd] = useState(true);
    const {
        setPanel,
        setValue,
        setPanelContent,
        state: { selections, value, panelContent, showPanel },
    } = useContext(ComboSelectContext);

    const searchRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        setValue('');
        searchRef.current?.focus();
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
        <div className="bg-L-basic dark:bg-D-basic border rounded-md flex items-center border-L-gray-400 dark:border-D-gray-400 gap-1 h-8 pl-1 text-xs  dark:focus-within:border-D-infoo-100 focus-within:border-L-info-100">
            <div className="pr-2">
                <SearchIcon className="text-L-gray-500 w-[1.1rem] h-[1.1rem] dark:text-D-gray-500" />
            </div>
            <div onMouseOver={() => setKbd(true)} onMouseLeave={() => setKbd(false)} className="flex items-center w-full relative">
                <Combo.SearchBox
                    ref={searchRef}
                    className="bg-L-basic dark:bg-D-basic h-full text-xs w-full px-1 outline-none border-transparent text-D-basic dark:text-L-basic"
                    onKeyDown={(e) => setPanel(e.key !== 'Escape' ? true : false)}
                    onClick={() => handleReset()}

                    // onDoubleClick={(e) => setPanel(true)}
                />
                {/* <div
                    className={clsx(
                        'duration-300 delay-300 text-1.1 items-center justify-center text-gray-500 flex gap-1 absolute left-0',
                        Kbd ? 'opacity-50 hover:opacity-100' : 'opacity-0',
                    )}
                >
                    <kbd className="bg-gradient-to-b text-1.2 from-slate-100 to-slate-500 rounded-sm px-1 py-0.5 pb-2 shadow-xl drop-shadow ">
                        <div className="bg-gradient-to-b from-slate-400 to-slate-50 rounded-sm px-1 shadow-xl drop-shadow-lg text-gray-600">ctrl</div>
                    </kbd>
                    <span className="whitespace-nowrap">ادامه جستجو</span>
                </div> */}
            </div>
            <div
                onClick={() => handleClear()}
                hidden={!value?.length || loading}
                className=" scale-[0.6] rounded-full bg-L-gray-400 dark:bg-D-gray-400"
            >
                <PlusIcon className="rotate-45 text-white " />
            </div>
            <div hidden={!loading}>
                <SpinnerIcon className="text-L-gray-500 dark:text-D-gray-500" />
            </div>
            <hr className="bg-L-gray-400 dark:bg-D-gray-400  w-[1px] ml-1  h-7" />
            <div className="flex justify-between items-center gap-2 cursor-pointer" onClick={() => handleSetPanelContent()}>
                {/* <span hidden={!selections?.length} className="whitespace-nowrap bg-L-gray-300 dark:bg-D-gray-300 p-1 rounded-lg px-2 text-1.2">
                    {selections?.length && selections?.length < 10 ? selections?.length : '+9'} مورد انتخاب شده
                </span> */}

                <div
                    className={clsx(
                        'bg-L-gray-300 dark:bg-D-gray-300 p-1  rounded-lg flex items-center justify-center relative',
                        panelContent === 'SELECT' && showPanel && 'bg-L-primary-100',
                    )}
                >
                    <UserCheckIcon
                        className={clsx('w-[1.1rem] h-[1.1rem]', panelContent === 'SELECT' && showPanel ? 'text-L-primary-50' : 'text-L-gray-500 dark:text-D-gray-500')}
                    />
                    {selections?.length ? (
                        <span className="ltr absolute flex items-center justify-center aspect-square w-[18px]   -top-1 -right-2 text-1.1 leading-none text-white bg-L-primary-50 rounded-full">
                            {selections?.length && selections?.length < 10 ? selections?.length : '+9'}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
export default InputSearch;
