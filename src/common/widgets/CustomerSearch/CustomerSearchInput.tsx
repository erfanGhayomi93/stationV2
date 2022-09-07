import { useState } from 'react';
// import { useCustomerList } from 'src/app/queries';
import Input from 'src/common/components/Input';
import useDebounce from 'src/common/hooks/useDebounce';
import { Search } from 'src/common/icons';

type ICustomerSearchInputType = {};

const CustomerSearchInput = (props: ICustomerSearchInputType) => {
    const [params, setParams] = useState<IGoCustomerRequest>({ type: 'Customer' });
    const debouncedParams = useDebounce(params, 500);

    // const { data: searchResult, isLoading: isSearchLoading } = useCustomerList(debouncedParams);
    return (
        <div>
            <Input
                placeholder="جستجوی مشتری"
                addonBefore={<Search className="text-gray-400" />}
                onChange={(e) => setParams((prev) => ({ ...prev, term: e.target.value }))}
            />
        </div>
    );
};

export default CustomerSearchInput;
