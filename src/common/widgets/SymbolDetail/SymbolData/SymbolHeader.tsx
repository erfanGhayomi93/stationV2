import React, { useEffect } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries';
import CodalBtn from 'src/common/components/Buttons/CodalBtn';
import TseBtn from 'src/common/components/Buttons/TseBtn';
import SymbolState from 'src/common/components/SymbolState';
import { useAppValues } from 'src/redux/hooks';

const SymbolHeader = () => {
    //
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data, remove } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            symbolTitle: data?.symbolData?.symbolTitle,
            companyName: data?.symbolData?.companyName,
            symbolState: data?.symbolData?.symbolState,
            insCode: data?.symbolData?.insCode,
        }),
    });

    return (
        <div className="flex items-center">
            <div className="ml-2">
                {/* <img src="" alt="" /> */}
                <div className="w-[40px] h-[40px] bg-sky-400 rounded-full "></div>
            </div>
            <div className="ml-2">
                <SymbolState symbolState={data?.symbolState || ''} />
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
