import React from 'react';
import Input from 'src/common/components/Input';
import { Search } from 'src/common/icons';

const SymbolSearch = () => {
    //
    return (
        <div>
            <Input placeholder="جستجوی نماد" addonBefore={<Search className="text-gray-400" />} />
        </div>
    );
};

export default SymbolSearch;
