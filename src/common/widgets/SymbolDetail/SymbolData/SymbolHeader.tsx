import React from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries';
import CodalBtn from 'src/common/components/Buttons/CodalBtn';
import TseBtn from 'src/common/components/Buttons/TseBtn';
import { useAppValues } from 'src/redux/hooks';

const SymbolHeader = () => {
    //
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data, isLoading } = useSymbolGeneralInfo(selectedSymbol, (data) => ({
        symbolTitle: data?.symbolData?.symbolTitle,
        companyName: data?.symbolData?.companyName,
        symbolState: data?.symbolData?.symbolState,
        insCode: data?.symbolData?.insCode,
    }));

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
                <span className="font-bold">{data?.symbolTitle || '-'}</span>
                <small className="text-gray-400">{data?.companyName || '-'}</small>
            </div>
            <div className="mr-auto flex items-center">
                <CodalBtn symbolTitle={data?.symbolTitle || ''} />
                <TseBtn insCode={data?.insCode || ''} />
            </div>
        </div>
    );
};

export default React.memo(SymbolHeader);
