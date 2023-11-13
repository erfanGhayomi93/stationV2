import clsx from 'clsx';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { useGetCustomers } from 'src/app/queries/customer';
import useDebounce from 'src/common/hooks/useDebounce';
import Select from 'src/common/components/Select';
import ResultHeader from '../components/ResultItem/ResultHeader';
import ResultItem from '../components/ResultItem/ResultItem';
import { useCustomerSearchState } from '../context/CustomerSearchContext';
import SearchInput from '../components/SearchInput';
import WidgetLoading from 'src/common/components/WidgetLoading';
import dayjs from 'dayjs';
import Tippy from '@tippyjs/react';
import { Refresh2Icon } from 'src/common/icons';

const FavoriteList = () => {
    const { t } = useTranslation();
    const { state: { params: { term } } } = useCustomerSearchState();
    const [customerType, setCustomerType] = useState("")
    const debouncedTerm = useDebounce(term, 500);
    const [timeRefresh, setTimeRefresh] = useState<dayjs.Dayjs>(dayjs())


    const { data: customers, isFetching, refetch } = useGetCustomers({ IsFavorite: true } , {
        onSuccess(){
            setTimeRefresh(dayjs())
        }
    });

    const ItemRenderer = (props: any) => {
        return <div className="even:bg-L-gray-100 even:dark:bg-D-gray-100 hover:bg-L-primary-100 dark:hover:bg-D-primary-100" {...props}></div>;
    };

    const refetchToggleFavorite = () => {
        refetch()
    }

    const filteredData = useMemo(() => {
        if (!customers) return [];
        if (!customerType && !debouncedTerm) return customers;

        const trimmedTerm = debouncedTerm?.trim().toLowerCase(); // Trim and lowercase the term for case-insensitive matching

        return customers.filter(item => {
            const typeMatch = !customerType || item.customerType === customerType;
            const termMatch =
                !trimmedTerm ||
                item.title.includes(trimmedTerm) ||
                item.nationalCode.includes(trimmedTerm) ||
                item.bourseCode.includes(trimmedTerm);

            return typeMatch && termMatch;
        });
    }, [customers, customerType, debouncedTerm]);


    return (
        <div className="w-full h-full grid gap-2  overflow-y-auto text-1.2">
            <div className="bg-L-basic dark:bg-D-basic h-full rounded-lg py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                <div className="flex gap-2 py-2 px-4 w-full rounded bg-L-gray-200 dark:bg-D-gray-200 items-center justify-between">
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
                    <div
                        onClick={refetchToggleFavorite}
                        className='cursor-pointer select-none'
                    >
                        <Tippy hideOnClick={false} content={
                            <div className='flex flex-col gap-1'>
                                <span>آخـرین بـروز رســانی</span>
                                <span>{timeRefresh.calendar("jalali").format("HH:mm  YYYY/MM/DD")}</span>
                            </div>
                        }>
                            <div className='select-none'>
                                <Refresh2Icon />
                            </div>
                        </Tippy>
                    </div>
                </div>

                <div className="h-full flex flex-col">
                    <ResultHeader />

                    <WidgetLoading spining={isFetching}>
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
                    </WidgetLoading>

                </div>
            </div>
        </div>
    );
};

export default FavoriteList;
