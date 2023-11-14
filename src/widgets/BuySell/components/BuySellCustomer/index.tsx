import clsx from 'clsx';
import { FC, useMemo, useState } from 'react';
import { useAdvancedSearchQuery } from 'src/app/queries/customer';
import Combo from 'src/common/components/ComboSelect';
import CustomerResult from 'src/common/components/SearchResult/CustomerSearchResult/CustomerResult';
import CustomerSelected from 'src/common/components/SearchResult/CustomerSelected';
import { SpinnerIcon } from 'src/common/icons';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { emptySelectedCustomers, getSelectedCustomers, setSelectedCustomers } from 'src/redux/slices/option';
import InputSearch from './input';

interface IBuySellCustomerType { }

const BuySellCustomer: FC<IBuySellCustomerType> = ({ }) => {
    const appDispatch = useAppDispatch();

    const [term, setTerm] = useState('');
    const [min, setMin] = useState(false);
    const [panel, setPanel] = useState(false);

    const onSelectionChanged = (customer: IGoMultiCustomerType[]) => {
        // console.log("customer", customer)
        // appDispatch(setSelectedCustomers(customer));
    };

    const selectedCustomers = useAppSelector(getSelectedCustomers)

    const {
        data: qData,
        isLoading,
        isFetching,
    } = useAdvancedSearchQuery(
        { term },
        {
            onSuccess: () => {
                setPanel(true);
                setMin(false);
            },
        },
    );
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
                            'bg-white max-h-[300px] overflow-y-auto absolute w-full z-[90] top-0  origin-top shadow-md ',
                            !active && 'scale-y-0',
                        )}
                    >
                        {content === 'SELECT' ? (
                            <CustomerSelected selected={selectedCustomers} />
                        ) : (
                            <CustomerResult min={min} qData={qData || []} isLoading={isLoading} />
                        )}
                    </div>
                </>
            );
        }, [active, content, min]);

    return (
        <div className="flex w-full gap-4 pr-2">
            <label className="w-full flex items-center justify-center ">
                <span className="w-16 whitespace-nowrap ">مشتری</span>
                <div className="w-full">
                    <Combo.Provider
                        value={term}
                        withDebounce={1000}
                        placeholder="جستجو مشتری / گروه مشتری"
                        onInputChange={(value) => setTerm(value)}
                        onSelectionChange={(selected) => onSelectionChanged(selected)}
                        onPanelVisibiltyChange={(value) => setPanel(value)}
                        onMinimumEntered={setMin}
                        selections={selectedCustomers}
                        keyId={'customerISIN'}
                        showPanel={panel}
                        min={3}
                        multiple
                    >
                        <div>
                            <InputSearch loading={isFetching} selectionCount={selectedCustomers.length} />
                            <Combo.Panel className="relative z-[90]" onBlur={() => setPanel(false)} renderDepend={[min, isLoading, qData]}>
                                <Options />
                            </Combo.Panel>
                        </div>
                    </Combo.Provider>
                </div>
            </label>
        </div>
    );
};

export default BuySellCustomer;

export function SearchLoading({ isFetching, isLoading }: { isLoading: boolean; isFetching?: boolean }) {
    return (
        <>
            {(isFetching) && (
                <div className="p-5 flex items-center justify-center w-full h-full  text-L-gray-600 bg-L-basic dark:bg-D-basic">
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
                <div className="p-5 flex items-center justify-center w-full h-full  text-L-gray-600 bg-L-basic dark:bg-D-basic">
                    حداقل دو کاراکتر وارد نمایید.
                </div>
            )}
        </>
    );
}
