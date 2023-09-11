import React from 'react';
import { useGetAdminMessages } from 'src/app/queries/messages';

const AdminMessages = () => {
    //
    const { data } = useGetAdminMessages();
    return (
        <div className="px-4">
            <div className="border rounded-lg w-full h-[29rem] overflow-auto"></div>
        </div>
    );
};

export default AdminMessages;
