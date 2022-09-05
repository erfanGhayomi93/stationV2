import React from 'react';
import { useMemo } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries';
import ProgressBar from 'src/common/components/ProgressBar';
import { useAppValues } from 'src/redux/hooks';
import { abbreviateNumber, sepNumbers } from 'src/utils/helpers';

const AdditionalData = () => {
    //
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => data?.individualLegal });

    const buyPercent = useMemo(() => {
        const total = Number(data?.individualBuyVolume || 0) + Number(data?.legalBuyVolume || 0);
        const individual = data?.individualBuyVolume ? data?.individualBuyVolume / total : 0;
        const legal = data?.legalBuyVolume ? data?.legalBuyVolume / total : 0;
        return { individual, legal };
    }, [data?.individualBuyVolume, data?.legalBuyVolume]);

    const sellPercent = useMemo(() => {
        const total = Number(data?.individualSellVolume || 0) + Number(data?.legalSellVolume || 0);
        const individual = data?.individualSellVolume ? data?.individualSellVolume / total : 0;
        const legal = data?.legalSellVolume ? data?.legalSellVolume / total : 0;
        return { individual, legal };
    }, [data?.individualSellVolume, data?.legalSellVolume]);

    return (
        <div className="w-full h-full">
            <div className="w-full flex flex-col ">
                <div className="flex items-center my-2">
                    <div className="w-5/12">
                        <ProgressBar
                            topCenter={abbreviateNumber(data?.individualBuyVolume || 0)}
                            bottomCenter={sepNumbers(data?.numberOfIndividualBuyers || 0)}
                            bgColorClass="bg-green-500"
                            percent={buyPercent.individual * 100}
                            origin="end"
                        />
                    </div>
                    <div className="w-2/12 text-center">حقیقی</div>
                    <div className="w-5/12">
                        <ProgressBar
                            topCenter={abbreviateNumber(data?.individualSellVolume || 0)}
                            bottomCenter={sepNumbers(data?.numberOfIndividualSellers || 0)}
                            bgColorClass="bg-red-500"
                            percent={sellPercent.individual * 100}
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-5/12">
                        <ProgressBar
                            topCenter={abbreviateNumber(data?.legalBuyVolume || 0)}
                            bottomCenter={sepNumbers(data?.numberOfLegalBuyers || 0)}
                            bgColorClass="bg-green-500"
                            percent={buyPercent.legal * 100}
                            origin="end"
                        />
                    </div>
                    <div className="w-2/12 text-center">حقوقی</div>
                    <div className="w-5/12">
                        <ProgressBar
                            topCenter={abbreviateNumber(data?.legalSellVolume || 0)}
                            bottomCenter={sepNumbers(data?.numberOfLegalSellers || 0)}
                            bgColorClass="bg-red-500"
                            percent={sellPercent.legal * 100}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalData;
