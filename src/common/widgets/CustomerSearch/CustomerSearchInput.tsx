import React from 'react';
import Input from 'src/common/components/Input';
import { Search } from 'src/common/icons';

type ICustomerSearchInputType = {};

const CustomerSearchInput = (props: ICustomerSearchInputType) => {
    return (
        <div>
            <Input placeholder="جستجوی مشتری" addonBefore={<Search className="text-gray-400" />} />
        </div>
    );
};

export default CustomerSearchInput;
