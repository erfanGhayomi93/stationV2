import clsx from 'clsx';
import React, { useContext, useRef, useState } from 'react';
import { useCustomerListInfinit } from 'src/app/queries/customer';
import Combo from 'src/common/components/ComboSelect';
import { ComboSelectContext } from 'src/common/components/ComboSelect/context';
import CustomerMiniSelect from 'src/common/components/CustomerMiniSelect';
import { SearchIcon } from 'src/common/icons';

const PageCrash = () => {
    //

    return (
        <div className="">
            <CustomerMiniSelect />
        </div>
    );
};

export default PageCrash;
