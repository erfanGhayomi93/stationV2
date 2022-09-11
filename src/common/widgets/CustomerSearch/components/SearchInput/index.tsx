import React from 'react';
import Input from 'src/common/components/Input';
import { Search } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
type ISearchInputType = {};

const SearchInput = ({}: ISearchInputType) => {
    const { setState, state } = useCustomerSearchState();
    const setParams = (input: string) => {
        setState((prev) => ({ ...prev, params: { ...prev.params, term: input } }));
    };
    return (
        <>
            <Input placeholder="جستجوی مشتری" addonBefore={<Search className="text-gray-400" />} onChange={(e) => setParams(e.target.value)} />
        </>
    );
};

export default SearchInput;
