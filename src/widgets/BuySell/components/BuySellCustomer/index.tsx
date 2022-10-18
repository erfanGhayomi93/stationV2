import clsx from 'clsx';
import { FC, Fragment, useMemo, useState } from 'react';
import { useMultiCustomerListQuery } from 'src/app/queries/customer';
import Combo from 'src/common/components/ComboSelect';
import { SpinnerIcon } from 'src/common/icons';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import CustomerResult from './CustomerResult';
import InputSearch from './input';

interface IBuySellCustomerType {}

const BuySellCustomer: FC<IBuySellCustomerType> = ({}) => {
    const appDispatch = useAppDispatch();
    const [term, setTerm] = useState('');
    const [min, setMin] = useState(false);
    const [panel, setPanel] = useState(false);

    const [selected, setSelected] = useState<IGoCustomerSearchResult[]>([]);

    const onSelectionChanged = (customer: IGoCustomerSearchResult[]) => {
        //    isChecked
        //        ?
        appDispatch(setSelectedCustomers(customer));
        //    : appDispatch(setSelectedCustomers(selectedCustomers.filter((item) => item.customerISIN !== customer?.customerISIN)));
    };

    const {
        option: { selectedCustomers },
    } = useAppValues();

    const {
        data: qData,
        isLoading,
        isFetching,
    } = useMultiCustomerListQuery<IGoMultiCustomerType[]>(
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
                            <>
                                {selectedCustomers?.map((item, inx) => (
                                    <Fragment key={inx}>
                                        <Combo.DataSet
                                            key={inx}
                                            className="even:bg-L-gray-200 even:dark:bg-D-gray-200 border-b last:border-none border-L-gray-300 py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                                            label={item.customerTitle}
                                            value={item}
                                        >
                                            <div className="flex justify-between w-full">
                                                {item.customerTitle}
                                                <span>{item.bourseCode}</span>
                                            </div>
                                        </Combo.DataSet>
                                    </Fragment>
                                ))}
                            </>
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
                placeholder="جستجو مشتری / گروه مشتری"
                onInputChange={(value) => setTerm(value)}
                onSelectionChange={(selected) => onSelectionChanged(selected)}
                onPanelVisibiltyChange={(value) => setPanel(value)}
                onMinimumEntered={setMin}
                multiple={true}
                selections={selectedCustomers}
                keyId={'customerISIN'}
                showPanel={panel}
                min={3}
            >
                <div>
                    <InputSearch loading={isFetching} />
                    <Combo.Panel className="relative z-[90]" onBlur={() => setPanel(false)} renderDepend={[min, isLoading, qData]}>
                        <Options />
                    </Combo.Panel>
                </div>
            </Combo.Provider>
        </div>
    );
};

export default BuySellCustomer;

export function SearchLoading({ isFetching, isLoading }: { isLoading: boolean; isFetching?: boolean }) {
    return (
        <>
            {(isLoading || isFetching) && (
                <div className="p-5 flex items-center justify-center w-full h-full">
                    <div className="flex items-center justify-center gap-2 text-L-gray-400">
                        <span>در حال بارگذاری</span>
                        <SpinnerIcon width={25} height={25} />
                    </div>
                </div>
            )}
        </>
    );
}

export function MinLen({ min }: { min: boolean }) {
    return <>{min && <div className="p-5 flex items-center justify-center w-full h-full">حداقل دو کاراکتر وارد نمایید.</div>}</>;
}
