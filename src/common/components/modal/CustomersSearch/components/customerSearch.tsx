import { useQueryCustomerSearch } from '@api/customer';
import useDebounce from '@hooks/useDebounce';
import React, { useMemo, useState } from 'react'
import { Virtuoso } from 'react-virtuoso';


const customerSearch = () => {

    const [query, setQuery] = useState('');

    const debouncedTerm = useDebounce(query, 400);



    const { data: customerSearchData } = useQueryCustomerSearch(debouncedTerm);
    // 
    // const { data: customerSearchGroupData } = UseQueryCustomerSearchGroup(debouncedTerm);


//     const rowUI = useMemo(() => {
//         if (!listGroups) return null
// 
//         return (
//             <Virtuoso
//                 data={listGroups}
//                 className="rounded-lg rounded-t-none"
//                 itemContent={(index, data) => <ResultItem key={index} data={data} refetchToggleFavorite={refetchToggleFavorite} />}
//                 components={{
//                     Item: ItemRenderer,
//                 }}
//                 totalCount={listGroups.length}
//             />
//         );
//     }, [searchCustomers, defaultCustomers, isDefaultUse]);

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />


        </div>
    )
}

export default customerSearch