import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import useDebounce from 'src/common/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import Select from 'src/common/components/Select';
import ResultHeader from '../components/ResultItem/ResultHeader';
import ResultItem from '../components/ResultItem/ResultItem';
import { useCustomerSearchState } from '../context/CustomerSearchContext';
import SearchInput from '../components/SearchInput';
import { emptySelectedCustomers, getSelectedCustomers, setAllSelectedCustomers, toggleFavoriteSelectedCustomer } from 'src/redux/slices/option';
import Tippy from '@tippyjs/react';
import { PlusIcon, Refresh2Icon } from 'src/common/icons';
import dayjs from 'dayjs';
import { useMutationMultiMultiCustomer } from 'src/app/queries/customer';
import ipcMain from 'src/common/classes/IpcMain';
import { onInfoNotif } from 'src/handlers/notification';
import { sortAlpha } from 'src/widgets/SymbolDetail/SymbolData/tabs/SymbolChart/components/helper';

const SelectedList = () => {
    const { t } = useTranslation();

    const { state: { params: { term } }, setState } = useCustomerSearchState();

    const debouncedTerm = useDebounce(term, 500);

    const [timeRefresh, setTimeRefresh] = useState<dayjs.Dayjs>(dayjs())

    const [customerType, setCustomerType] = useState("")

    const selectedCustomers = useAppSelector(getSelectedCustomers);

    const dispatch = useAppDispatch()

    const { mutate: getCustomers } = useMutationMultiMultiCustomer({
        onSuccess: (selectedCustomer) => {
            dispatch(setAllSelectedCustomers(selectedCustomer))
            setTimeRefresh(dayjs())
        },
    });


    const ItemRenderer = (props: any) => {
        return <div className="even:bg-L-gray-100 even:dark:bg-D-gray-100 hover:bg-L-primary-100 dark:hover:bg-D-primary-100" {...props}></div>;
    };

    const refetchToggleFavorite = (customerISIN: string) => {
        dispatch(toggleFavoriteSelectedCustomer(customerISIN))
    }

    const refetchSelectedList = () => {
        const customerIsins = selectedCustomers.map(item => item.customerISIN)
        getCustomers({ CustomerISINs: customerIsins })
    }

    const AddToMyGroup = () => {
        if (selectedCustomers.length === 0) {
            onInfoNotif({ title: "مشتری انتخاب نشده است" })
            return;
        }

        setState(prev => ({ ...prev, isManagementMyGroupOpen: true, detailsManagementGroup: !!filteredData.length ? filteredData : undefined }))
    }


    const filteredData = useMemo(() => {
        if (!selectedCustomers) return []
        else if (!customerType && !debouncedTerm) return selectedCustomers

        const trimmedTerm = debouncedTerm?.trim().toLowerCase(); //

        return selectedCustomers
            .filter(item => {
                const typeMatch = !customerType || item.customerType === customerType
                const termMatch = !trimmedTerm ||
                    item.title?.includes(trimmedTerm) ||
                    item.nationalCode?.includes(trimmedTerm) ||
                    item.bourseCode?.includes(trimmedTerm)

                return typeMatch && termMatch

            })
    }, [selectedCustomers, customerType, debouncedTerm])

    const isALLSelected = useMemo(() => {
        if (selectedCustomers.length === 0) return false
        return true
    }, [selectedCustomers])

    const onALLSelectionChanged = (checked: boolean) => {
        !checked && dispatch(emptySelectedCustomers())
    }


    useEffect(() => {
        if (!!term && term?.length > 0) {
            setState((prev) => ({ ...prev, params: { ...prev.params, term: '' } }));
        }
    }, [])


    useEffect(() => {
        ipcMain.handle("update_customer", refetchSelectedList)

        return () => ipcMain.removeChannel("update_customer")
    }, [])


    return (
        <div className="w-full h-full grid gap-2  overflow-y-auto text-1.2">
            <div className="bg-L-basic dark:bg-D-basic h-full rounded-lg py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                <div className="flex gap-2 py-2 px-4 w-full rounded bg-L-gray-200 dark:bg-D-gray-200 justify-between items-center">
                    <div className="flex gap-6 flex-1">
                        <SearchInput placeholder='نام مشتری / کدملی / کدبورسی' />

                        <div className='w-[100px]'>
                            <Select
                                onChange={(selected) => setCustomerType(selected)}
                                value={customerType}
                                options={[
                                    { value: "", label: 'همه' },
                                    { value: "Natural", label: t('CustomerType.Natural') },
                                    { value: "Legal", label: t('CustomerType.Legal') },
                                ]}
                            />
                        </div>
                    </div>

                    <div className='flex items-center gap-x-4'>
                        <button
                            className="shadow-sm flex items-center gap-2 py-1.5 drop-shadow-sm px-2  text-L-primary-50 dark:text-D-primary-50 border border-L-primary-50 dark:border-D-primary-50 p-1 text-1.3 rounded-md"
                            onClick={AddToMyGroup}
                        >
                            <PlusIcon />
                            افزودن به گروه‌های من
                            {'(' + filteredData.length + ')'}
                        </button>



                        <div
                            onClick={refetchSelectedList}
                            className='cursor-pointer select-none'
                        >
                            <Tippy hideOnClick={false} content={
                                <div className='flex flex-col gap-1'>
                                    <span>آخـرین بـروز رســانی</span>
                                    <span>{timeRefresh.calendar("jalali").format("HH:mm  YYYY/MM/DD")}</span>
                                </div>
                            }>
                                <div className='select-none'>
                                    <Refresh2Icon className='w-5 h-5' />
                                </div>
                            </Tippy>
                        </div>
                    </div>

                </div>
                <div className="grid grid-rows-min-one h-full">
                    <ResultHeader
                        isAllSelected={isALLSelected}
                        onALLSelectionChanged={onALLSelectionChanged}
                    />

                    <Virtuoso
                        data={filteredData}
                        className="rounded-lg rounded-t-none"
                        itemContent={(index, data) =>
                            <ResultItem
                                key={index}
                                data={data}
                                refetchToggleFavorite={refetchToggleFavorite}
                            />
                        }
                        components={{
                            Item: ItemRenderer,
                        }}
                    />

                </div>
            </div>
        </div>
    );
};

export default SelectedList;
