// import { useQueryCustomerSearch, useQueryCustomerSearchGroup } from '@api/customer';
// import { useState } from 'react';
// import clsx from 'clsx';

import Input from "@components/inputs";
import { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";

const CustomersSearch = () => {
     const [value, setValue] = useState("");

     const { t } = useTranslation()

     // const { data: customerSearchData } = useQueryCustomerSearch();

     // const { data: customerSearchGroupData } = useQueryCustomerSearchGroup();


     return (
          <div className="flex-1">
               <Input
                    value={value}
                    onChange={(v) => setValue(v)}
                    placeholder={"مشتری"}
                    maxLength={10}
               />
          </div>
     );
};

export default CustomersSearch;
