import clsx from 'clsx';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useSymbolSearch } from 'src/app/queries/symbol';
import { SpinnerIcon } from 'src/common/icons';
import Combo from '../ComboSelect';
import SymbolResult from '../SearchResult/SymbolSearchResult/SymbolResult';
import SymbolSelected from '../SearchResult/SymbolSelected';
import InputSearch from './input';

interface ISymbolMiniSelectType {
    multiple?: boolean;
    isBigSize?: boolean;
    isOnModal?: boolean;
    setSelected: (selected: SymbolSearchResult[]) => void;
    selected: SymbolSearchResult[];

}

const SymbolMiniSelect: FC<ISymbolMiniSelectType> = ({ selected, setSelected, multiple, isBigSize, isOnModal }) => {
    const [term, setTerm] = useState('');
    const [min, setMin] = useState(false);
    const [panel, setPanel] = useState(false);

    const {
        data: qData,
        isLoading,
        isFetching,
    } = useSymbolSearch(term, {
        onSuccess: () => {
            setPanel(true);
            setMin(false);
        },
    });

    // useEffect(() => {
    //     selected.length === 0 && setTerm('');
    // }, [selected]);

    const handleSelect = (value: SymbolSearchResult[]) => {
        setSelected(value);
        (!isOnModal && !multiple) && setPanel(false);
    };
    interface IOptionsType {
        active?: boolean;
        content?: string;
    }
    const Options = ({ active, content }: IOptionsType) =>
        useMemo(() => {
            return (
                <>
                    <div
                        className={clsx('bg-white  overflow-y-auto absolute w-full z-10 top-0  origin-top', {
                            'scale-y-0': !active,
                            'shadow-md max-h-[300px]': !isOnModal,
                            ' max-h-[400px] mt-1 border border-L-gray-300 dark:border-D-gray-300': !!isOnModal,
                        }

                        )}
                    >
                        {content === 'SELECT' ? (
                            // <>
                            //     {selected?.map((item, inx) => (
                            //         <Fragment key={inx}>
                            //             <Combo.DataSet
                            //                 key={inx}
                            //                 className="even:bg-L-gray-300 even:dark:bg-D-gray-300 border-b last:border-none   py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                            //                 label={item.symbolTitle}
                            //                 value={item}
                            //             >
                            //                 <div className="flex justify-between w-full">
                            //                     {item.symbolTitle}
                            //                     <span>{item.companyISIN}</span>
                            //                 </div>
                            //             </Combo.DataSet>
                            //         </Fragment>
                            //     ))}
                            // </>
                            <SymbolSelected selected={selected} />
                        ) : (
                            <SymbolResult min={min} qData={qData || []} isLoading={isLoading} isOnModal={isOnModal} />
                        )}
                    </div>
                </>
            );
        }, [active, content, min]);

    return (
        <div>
            <Combo.Provider
                multiple={multiple}
                value={term}
                withDebounce={1000}
                placeholder="جستجوی نماد"
                onInputChange={(value) => setTerm(value)}
                onSelectionChange={(selected) => handleSelect(selected)}
                onPanelVisibiltyChange={(value) => setPanel(value)}
                onMinimumEntered={setMin}
                selections={selected}
                keyId={'symbolISIN'}
                showPanel={panel}
                min={2}
            >
                <div>
                    <InputSearch isBigSize={isBigSize} loading={isLoading || isFetching} />

                    <div>
                        <Combo.Panel className="relative" onBlur={() => !isOnModal && setPanel(false)} renderDepend={[min, isLoading, qData]}>
                            <Options />
                        </Combo.Panel>
                    </div>
                </div>
            </Combo.Provider>
        </div>
    );
};

export default memo(SymbolMiniSelect);

export function SearchLoading({ isFetching, isLoading }: { isLoading: boolean; isFetching?: boolean }) {
    return (
        <>
            {(isLoading || isFetching) && (
                <div className="p-5 flex items-center justify-center w-full h-full  bg-L-basic dark:bg-D-basic text-L-gray-500 dark:text-D-gray-700">
                    <div className="flex items-center justify-center gap-2 text-L-gray-500">
                        <span>در حال بارگذاری</span>
                        <SpinnerIcon width={25} height={25} />
                    </div>
                </div>
            )}
        </>
    );
}

export function MinLen({ min }: { min: boolean }) {
    return (
        <>
            {min && (
                <div className="p-5 flex items-center text-1.2 bg-L-basic dark:bg-D-basic text-L-gray-500 dark:text-D-gray-700 justify-center w-full h-full">
                    حداقل سه کاراکتر وارد نمایید.
                </div>
            )}
        </>
    );
}
