import { useMutation } from '@tanstack/react-query';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import { terminateSession } from 'src/app/queries/settings/sessionLog';
import { QuitIcon } from 'src/common/icons';

interface Props extends ICellRendererParams {
    refetchLogins: () => void;
}

const ActionCell = ({ data, refetchLogins }: Props) => {
    //

    const { mutate } = useMutation(terminateSession, {
        onSuccess: ({ result }) => {
            refetchLogins();
        },
    });

    const forceLogout = () => {
        data.uniqueId && mutate(data.uniqueId);
    };

    return (
        <div className="h-full flex items-center justify-center">
            <button onClick={forceLogout} className="text-L-error-200">
                <QuitIcon className='w-5 h-5'/>
            </button>
        </div>
    );
};

export default ActionCell;
