import React from 'react';
import Active2StepLogin from './Active2StepLogin';
import UpdateUser from './UpdateUser';

const AccountSetting = () => {
    return (
        <div className="m-auto flex flex-col gap-2 w-11/12 xl:w-3/4 max-w-[1320px]">
            <div className="p-6 border border-L-gray-300 bg-L-gray-100 dark:border-D-gray-300 dark:bg-D-gray-100 rounded-lg">
                <Active2StepLogin />
            </div>
            <div className="p-6 border border-L-gray-300 bg-L-gray-100 dark:border-D-gray-300 dark:bg-D-gray-100 rounded-lg">
                <UpdateUser />
            </div>
        </div>
    );
};

export default AccountSetting;
