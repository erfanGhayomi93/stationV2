import { useQueryCustomerSearch, useQueryDefaultCustomer } from '@api/customer';
import useDebounce from '@hooks/useDebounce';
import { useMemo, useState } from 'react'
import { Virtuoso } from 'react-virtuoso';
import ResultItem from './resultItem';
import ResultHeader from './resultHeader';
import { useCustomerStore } from '@store/customer';


const CustomersSearchBody = () => {

    const [term, setTerm] = useState('');

    const debouncedTerm = useDebounce(term, 400);

    const { selectedCustomers, setAllSelectedCustomersWithPrevious, setSelectedCustomers } = useCustomerStore()

    const { data: searchCustomers } = useQueryCustomerSearch(debouncedTerm);

    const { data: defaultCustomers } = useQueryDefaultCustomer()

    const isDefaultUse = useMemo(() => !term?.length, [term]);


    const listGroups = useMemo(() => {
        return isDefaultUse ? defaultCustomers : searchCustomers

    }, [defaultCustomers, searchCustomers, isDefaultUse])

    const ItemRenderer = (props: any) => {
        return <div className="odd:bg-table-row1 even:bg-table-row2 text-sm" {...props}></div>;
    };

//     useEffect(() => {
//         console.log('selectedCustomers', selectedCustomers)
//     }, [selectedCustomers])
// 




    const isALLSelected = useMemo(() => {
        if (!listGroups || listGroups.length === 0) return false;

        const selectedCustomersISINs = selectedCustomers?.map(item => item.customerISIN)

        return listGroups?.every(item => selectedCustomersISINs.includes(item.customerISIN))
    }, [listGroups, selectedCustomers])

    const onALLSelectionChanged = (checked: boolean) => {
        if (!listGroups) return;

        if (checked) {
            setAllSelectedCustomersWithPrevious(listGroups)
        } else {
            // If not checked, filter out customers from the selected list that are in the current group
            const customerISINs = listGroups.map(child => child.customerISIN);
            const filteredSelectedCustomers = selectedCustomers.filter(customer => !customerISINs.includes(customer.customerISIN));
            setSelectedCustomers(filteredSelectedCustomers);
        }
    }


    const rowUI = useMemo(() => {
        if (!listGroups) return null

        return (
            <Virtuoso
                data={listGroups}
                className="rounded-lg rounded-t-none"
                itemContent={(index, data) => <ResultItem key={index} data={data} />}
                components={{
                    Item: ItemRenderer,
                }}
                totalCount={listGroups.length}
            />
        );
    }, [searchCustomers, defaultCustomers, isDefaultUse]);

    return (
        <div className='flex flex-col gap-y-6'>
            <div>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className='border border-content-title'
                />
            </div>


            <div className="grid grid-rows-min-one h-80 rounded-lg">
                <ResultHeader
                    isAllSelected={isALLSelected}
                    onALLSelectionChanged={onALLSelectionChanged}
                />
                {rowUI}
            </div>


        </div>
    )
}

export default CustomersSearchBody