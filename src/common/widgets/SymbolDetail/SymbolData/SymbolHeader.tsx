import React from 'react';
import CodalBtn from 'src/common/components/Buttons/CodalBtn';
import TseBtn from 'src/common/components/Buttons/TseBtn';

const SymbolHeader = () => {
    //
    return (
        <div className="flex items-center">
            <div className="ml-2">
                {/* <img src="" alt="" /> */}
                <div className="w-[40px] h-[40px] bg-sky-400 rounded-full "></div>
            </div>
            <div className="ml-2">
                <div className="w-[9px] h-[9px] bg-green-400 rounded-full "></div>
            </div>
            <div className="flex flex-col">
                <span className="font-bold">فولاد</span>
                <small className="text-gray-400">شرکت فولاد</small>
            </div>
            <div className="mr-auto flex items-center">
                <CodalBtn symbolTitle="سرو" />
                <TseBtn insCode="64942549055019553" />
            </div>
        </div>
    );
};

export default React.memo(SymbolHeader);
