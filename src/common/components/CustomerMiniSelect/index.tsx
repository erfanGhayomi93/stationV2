import clsx from 'clsx';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useMultiCustomerListQuery } from 'src/app/queries/customer';
import { SpinnerIcon } from 'src/common/icons';
import Combo from '../ComboSelect';
import CustomerResult from '../SearchResult/CustomerSearchResult/CustomerResult';
import CustomerSelected from '../SearchResult/CustomerSelected';
import InputSearch from './input';

interface ICustomerMiniSelectType {
    setSelected: (selected: IGoMultiCustomerType[]) => void;
    selected: IGoMultiCustomerType[];
}

const CustomerMiniSelect: FC<ICustomerMiniSelectType> = ({ selected, setSelected }) => {
    const [term, setTerm] = useState('');
    const [min, setMin] = useState(false);
    const [panel, setPanel] = useState(false);
    const [type, setType] = useState<ICustomerMultiTypeType>('Legal');

    const {
        data: qData,
        isLoading,
        isFetching,
    } = useMultiCustomerListQuery<IGoMultiCustomerType[]>(
        { term, type: [type] },
        {
            onSuccess: () => {
                setPanel(true);
                setMin(false);
            },
        },
    );

    const handleSelect = (value: IGoMultiCustomerType[]) => {
        setSelected(value);
        setPanel(false);
    };
    interface IOptionsType {
        active?: boolean;
        content?: string;
    }

    useEffect(() => {
        selected.length === 0 && setTerm('');
    }, [selected]);

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
                            <CustomerSelected selected={selected} />
                        ) : (
                            <CustomerResult min={min} qData={qData || []} isLoading={isLoading} />
                        )}
                    </div>
                </>
            );
        }, [active, content, min]);

    return (
        <div>
            <Combo.Provider
                value={term}
                withDebounce={1000}
                placeholder="جستجو مشتری"
                onInputChange={(value) => setTerm(value)}
                onSelectionChange={(selected) => handleSelect(selected)}
                onPanelVisibiltyChange={(value) => setPanel(value)}
                onMinimumEntered={setMin}
                selections={selected}
                keyId={'customerISIN'}
                showPanel={panel}
                min={3}
            >
                <div>
                    <InputSearch onTypeChange={setType} loading={isFetching} />

                    <Combo.Panel className="relative" onBlur={() => setPanel(false)} renderDepend={[min, isLoading, qData]}>
                        <Options />
                    </Combo.Panel>
                </div>
            </Combo.Provider>
        </div>
    );
};

export default memo(CustomerMiniSelect);

export function SearchLoading({ isFetching, isLoading }: { isLoading: boolean; isFetching?: boolean }) {
    return (
        <>
            {isFetching && (
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
                <div className="p-5 flex items-center text-1.2 justify-center w-full h-full bg-L-basic dark:bg-D-basic text-L-gray-500 dark:text-D-gray-700">
                    حداقل سه کاراکتر وارد نمایید.
                </div>
            )}
        </>
    );
}
