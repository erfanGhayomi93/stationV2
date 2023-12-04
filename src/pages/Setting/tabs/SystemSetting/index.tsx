import React from 'react';
import HotkeysSetting from './HotkeysSetting';
import ViewSetting from './ViewSetting';
import OrderSetting from './OrderSetting';
import AlarmSetting from './AlarmSetting';

const SystemSetting = () => {
    return (
        <div style={{ gridTemplateRows: '0.85fr 1.15fr' }} className="h-full max-h-[48rem] grid grid-cols-2 gap-6 w-11/12 xl:w-3/4 max-w-[80rem] m-auto">
            <div className="p-4 border overflow-y-auto rounded-lg border-L-gray-300 bg-L-gray-100 dark:border-D-gray-300 dark:bg-D-gray-100">
                <ViewSetting />
            </div>
            <div className="p-4 border overflow-y-auto rounded-lg border-L-gray-300 bg-L-gray-100 dark:border-D-gray-300 dark:bg-D-gray-100">
                <HotkeysSetting />
            </div>
            <div className="p-4 border overflow-y-auto rounded-lg border-L-gray-300 bg-L-gray-100 dark:border-D-gray-300 dark:bg-D-gray-100">
                <OrderSetting />
            </div>
            <div className="p-4 border overflow-y-auto rounded-lg border-L-gray-300 bg-L-gray-100 dark:border-D-gray-300 dark:bg-D-gray-100">
                <AlarmSetting />
            </div>
        </div>
    );
};

export default SystemSetting;
