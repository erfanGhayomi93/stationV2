import clsx from 'clsx';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useSymbolSearch } from 'src/app/queries/symbol';
import { SpinnerIcon } from 'src/common/icons';
import Combo from '../ComboSelect';
import SymbolResult from '../SearchResult/SymbolSearchResult/SymbolResult';
import SymbolSelected from '../SearchResult/SymbolSelected';
import InputSearch from './input';

interface ISymbolMiniSelectType {
    onChange: (selected: string[]) => void;
    multiple?: boolean;
}

const SymbolMiniSelect: FC<ISymbolMiniSelectType> = ({ onChange, multiple }) => {
    const [term, setTerm] = useState('');
    const [min, setMin] = useState(false);
    const [panel, setPanel] = useState(false);
    const [selected, setSelected] = useState<SymbolSearchResult[]>([]);

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
        onChange && onChange(value.map(({ symbolISIN }) => symbolISIN));
        !multiple && setPanel(false);
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
                        className={clsx(
                            'bg-white max-h-[300px] overflow-y-auto absolute w-full z-10 top-0  origin-top shadow-md ',
                            !active && 'scale-y-0',
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
                            <SymbolResult min={min} qData={qData || []} isLoading={isLoading} />
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
                min={3}
            >
                <div>
                    <InputSearch loading={isLoading || isFetching} />

                    <Combo.Panel className="relative" onBlur={() => setPanel(false)} renderDepend={[min, isLoading, qData]}>
                        <Options />
                    </Combo.Panel>
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
