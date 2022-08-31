import React from 'react';
import { UserIcon } from 'src/common/icons';
import { useGlobalValues } from 'src/app/contexts/global';

const UserData = () => {
    //
    const { userData } = useGlobalValues();

    return (
        <div className="flex items-center ">
            <span className="ml-1">
                <UserIcon className="text-[#354B61]" width={'21px'} height={'21px'} />
            </span>
            <span className="font-bold">{`${userData?.firstName || ''} ${userData?.lastName || ''}`}</span>
        </div>
    );
};

export default UserData;
