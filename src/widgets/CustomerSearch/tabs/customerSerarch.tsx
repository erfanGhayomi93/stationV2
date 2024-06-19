import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { useAdvancedSearchQuery, useGetCustomers } from 'src/app/queries/customer';
import useDebounce from 'src/common/hooks/useDebounce';
import Select from 'src/common/components/Select';
import ResultHeader from '../components/ResultItem/ResultHeader';
import ResultItem from '../components/ResultItem/ResultItem';
import { useCustomerSearchState } from '../context/CustomerSearchContext';
import SearchInput from '../components/SearchInput';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { Refresh2Icon } from 'src/common/icons';
import Tippy from '@tippyjs/react';
import dayjs from 'dayjs';
import ipcMain from 'src/common/classes/IpcMain';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getSelectedCustomers, setAllSelectedCustomers, setAllSelectedCustomersWithPrevious } from 'src/redux/slices/option';

const CustomerSearch = () => {
    const { t } = useTranslation();

    const {
        state: {
            params: { term },
        },
    } = useCustomerSearchState();

    const appDispatch = useAppDispatch()

    const selectedCustomers = useAppSelector(getSelectedCustomers);

    const debouncedTerm = useDebounce(term, 500);

    const [customerType, setCustomerType] = useState('');

    const isDefaultUse = useMemo(() => !term?.length, [term]);

    const [timeRefresh, setTimeRefresh] = useState<dayjs.Dayjs>(dayjs());


    const {
        data: defaultCustomers,
        refetch: refetchDefaultCustomer,
        remove: removeDefaultCustomers,
        isFetching: isFetchingDefault,
    } = useGetCustomers(
        {},
        {
            enabled: isDefaultUse,
            onSuccess() {
                setTimeRefresh(dayjs());
            },
        },
    );

    const {
        data: searchCustomers,
        refetch: refetchCustomers,
        isFetching: isFetchingSearch,
    } = useAdvancedSearchQuery(
        { term: debouncedTerm },
        {
            onSuccess() {
                if (!!defaultCustomers) {
                    removeDefaultCustomers();
                }
                setTimeRefresh(dayjs());
            },
        },
    );

    const listGroups = useMemo(() => {
        let res = isDefaultUse ? defaultCustomers : searchCustomers
        if (!customerType) {
            return res
        }
        return res?.filter((item) => item.customerType === customerType);

    }, [defaultCustomers, searchCustomers, isDefaultUse, customerType])

    const ItemRenderer = (props: any) => {
        return <div className="even:bg-L-gray-100 even:dark:bg-D-gray-100 hover:bg-L-primary-100 dark:hover:bg-D-primary-100" {...props}></div>;
    };

    const refetchToggleFavorite = () => {
        isDefaultUse ? refetchDefaultCustomer() : refetchCustomers();
    };

    const isALLSelected = useMemo(() => {
        if (!listGroups || listGroups.length === 0) return false;

        const selectedCustomersISINs = selectedCustomers?.map(item => item.customerISIN)

        return listGroups?.every(item => selectedCustomersISINs.includes(item.customerISIN))
    }, [listGroups, selectedCustomers])

    const onALLSelectionChanged = (checked: boolean) => {
        if (!listGroups) return;

        if (checked) {
            appDispatch(setAllSelectedCustomersWithPrevious(listGroups))
        } else {
            // If not checked, filter out customers from the selected list that are in the current group
            const customerISINs = listGroups.map(child => child.customerISIN);
            const filteredSelectedCustomers = selectedCustomers.filter(customer => !customerISINs.includes(customer.customerISIN));
            appDispatch(setAllSelectedCustomers(filteredSelectedCustomers));
        }


    }

    const rowUI = useMemo(() => {
        if (!listGroups) return null

        return (
            <Virtuoso
                data={listGroups}
                className="rounded-lg rounded-t-none"
                itemContent={(index, data) => <ResultItem key={index} data={data} refetchToggleFavorite={refetchToggleFavorite} />}
                components={{
                    Item: ItemRenderer,
                }}
                totalCount={listGroups.length}
            />
        );
    }, [searchCustomers, defaultCustomers, customerType, isDefaultUse]);

    useEffect(() => {
        ipcMain.handle('update_customer', refetchToggleFavorite);

        return () => ipcMain.removeChannel('update_customer');
    }, []);


    return (
        <div className="w-full h-full grid gap-2  overflow-y-auto text-1.2">
            <div className="bg-L-basic dark:bg-D-basic h-full rounded-lg py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2">
                <div className="flex gap-2 py-2 px-4 w-full rounded bg-L-gray-200 dark:bg-D-gray-200 justify-between items-center">
                    <div className="flex gap-6 flex-1">
                        <SearchInput placeholder="نام مشتری / کدملی / کدبورسی" />

                        <div className="w-40">
                            <Select
                                title="نوع مشتری :"
                                onChange={(selected) => setCustomerType(selected)}
                                value={customerType}
                                options={[
                                    { value: '', label: 'همه' },
                                    { value: 'Natural', label: t('CustomerType.Natural') },
                                    { value: 'Legal', label: t('CustomerType.Legal') },
                                ]}
                            />
                        </div>
                    </div>
                    <div onClick={refetchToggleFavorite} className="cursor-pointer select-none">
                        <Tippy
                            hideOnClick={false}
                            content={
                                <div className="flex flex-col gap-1">
                                    <span>آخـرین بـروز رســانی</span>
                                    <span>{timeRefresh.calendar('jalali').format('HH:mm  YYYY/MM/DD')}</span>
                                </div>
                            }
                        >
                            <div className="select-none">
                                <Refresh2Icon className="w-5 h-5" />
                            </div>
                        </Tippy>
                    </div>
                </div>

                <div className="grid grid-rows-min-one h-full">
                    <ResultHeader
                        isAllSelected={isALLSelected}
                        onALLSelectionChanged={onALLSelectionChanged}
                    />

                    <WidgetLoading spining={isFetchingSearch || isFetchingDefault}>{rowUI}</WidgetLoading>
                </div>
            </div>
        </div>
    );
};

export default CustomerSearch;
