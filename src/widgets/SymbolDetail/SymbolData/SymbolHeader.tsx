import React from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import AddToWatchlistButton from 'src/common/components/AddToWatchlistButton';
import CodalBtn from 'src/common/components/Buttons/CodalBtn';
import TseBtn from 'src/common/components/Buttons/TseBtn';
import SymbolState from 'src/common/components/SymbolState';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedSymbol } from 'src/redux/slices/option';
import SymbolEvent from './SymbolEvent';

const SymbolHeader = () => {
    //
    const selectedSymbol = useAppSelector(getSelectedSymbol);
    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            symbolTitle: data?.symbolData?.symbolTitle,
            companyName: data?.symbolData?.companyName,
            symbolState: data?.symbolData?.symbolState,
            insCode: data?.symbolData?.insCode,
            companyCode: data?.symbolData?.companyCode,
            symbolEvents: data?.symbolData?.eventsWithinNextTenDays,
        }),
    });

    return (
        <div className="flex items-center w-full ">
            <div className="flex items-center gap-1">
                {!!data?.symbolEvents.length && <SymbolEvent events={data?.symbolEvents} />}
                <div className="">
                    <div className="w-[40px] h-[40px] bg-sky-400 rounded-full ">
                        {data?.companyCode && <img src={`https://resource.ramandtech.com/CompanyLogo/${data?.companyCode}_40_40.jpg`} alt={''} />}
                    </div>
                </div>
                <div className=" flex items-center gap-2">
                    <SymbolState symbolState={data?.symbolState || ''} />

                    <div className="flex flex-col">
                        <span className="font-bold dark:text-L-basic text-D-basic">{data?.symbolTitle || '-'}</span>
                        <small className="text-L-gray-500 dark:text-D-gray-500">{data?.companyName || '-'}</small>
                    </div>
                </div>
            </div>
            <div className="mr-auto flex items-center">
                <AddToWatchlistButton symbolISIN={selectedSymbol} />
                <CodalBtn symbolTitle={data?.symbolTitle || ''} />
                <TseBtn insCode={data?.insCode || ''} />
            </div>
        </div>
    );
};

export default React.memo(SymbolHeader);
