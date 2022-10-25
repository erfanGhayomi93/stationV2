import React from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import AddToWatchlistButton from 'src/common/components/AddToWatchlistButton';
import CodalBtn from 'src/common/components/Buttons/CodalBtn';
import TseBtn from 'src/common/components/Buttons/TseBtn';
import SymbolState from 'src/common/components/SymbolState';
import { useAppValues } from 'src/redux/hooks';

const SymbolHeader = () => {
    //
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            symbolTitle: data?.symbolData?.symbolTitle,
            companyName: data?.symbolData?.companyName,
            symbolState: data?.symbolData?.symbolState,
            insCode: data?.symbolData?.insCode,
            companyCode: data?.symbolData?.companyCode,
        }),
    });

    return (
        <div className="flex items-center w-full ">
            <div className="flex gap-1">
                <div className="">
                    <div className="w-[40px] h-[40px] bg-sky-400 rounded-full ">
                        <img src={`https://resource.ramandtech.com/CompanyLogo/${data?.companyCode}_40_40.jpg`} alt={data?.companyName} />
                    </div>
                </div>
                <div className=" flex items-center gap-2">
                    <SymbolState symbolState={data?.symbolState || ''} />

                    <div className="flex flex-col">
                        <span className="font-bold dark:text-L-basic text-D-basic">{data?.symbolTitle || '-'}</span>
                        <small className="text-L-gray-400 dark:text-D-gray-400">{data?.companyName || '-'}</small>
                    </div>
                </div>
            </div>
            <div className="mr-auto flex items-center">
                <CodalBtn symbolTitle={data?.symbolTitle || ''} />
                <TseBtn insCode={data?.insCode || ''} />
                <AddToWatchlistButton symbolISIN={selectedSymbol} />
            </div>
        </div>
    );
};

export default React.memo(SymbolHeader);
