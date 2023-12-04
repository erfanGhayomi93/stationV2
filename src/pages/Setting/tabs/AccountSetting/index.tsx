import React from 'react';
import Active2StepLogin from './Active2StepLogin';
import UpdateUser from './UpdateUser';
import { useGetUserSetting } from 'src/app/queries/settings/userSetting';
import WidgetLoading from 'src/common/components/WidgetLoading';

const AccountSetting = () => {
    //
    const { data: userSetting } = useGetUserSetting();
    return (
        <div className="m-auto flex flex-col gap-2 w-11/12 xl:w-3/4 max-w-[80rem]">
            <div className="p-6 border border-L-gray-300 bg-L-gray-100 dark:border-D-gray-300 dark:bg-D-gray-100 rounded-lg">
                <Active2StepLogin
                    fullName={userSetting?.name || '-'}
                    nationalCode={userSetting?.nationalCode || '-'}
                    traderCode={userSetting?.traderCode || '-'}
                />
            </div>
            <div className="p-6 border border-L-gray-300 bg-L-gray-100 dark:border-D-gray-300 dark:bg-D-gray-100 rounded-lg">
                <UpdateUser
                    email={userSetting?.email || '-'}
                    phoneNumber={userSetting?.phone || '-'}
                    stationCode={userSetting?.stationCode || '-'}
                    stationName={userSetting?.stationName || '-'}
                    // userName={userSetting?.userName || ''}
                />
            </div>
        </div>
    );
};

export default AccountSetting;
