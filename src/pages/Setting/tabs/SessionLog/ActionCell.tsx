import React from 'react';
import { QuitIcon } from 'src/common/icons';

const ActionCell = () => {
    //
    const forceLogout = () => {};

    return (
        <div className="h-full flex items-center justify-center">
            <button onClick={forceLogout} className="text-L-error-200">
                <QuitIcon />
            </button>
        </div>
    );
};

export default ActionCell;
