import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { pushEngine } from 'src/api/pushEngine';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { useAppValues } from 'src/redux/hooks';
import SymbolData from './SymbolData';
import SymbolSearch from './SymbolSearch';

const SymbolDetail = () => {
    //
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const queryClient = useQueryClient();

    // isLoading or isFetching ? depends ...
    const { remove, isLoading, isFetching } = useSymbolGeneralInfo(selectedSymbol, {
        onSuccess: (data) => {
            pushEngine.subscribe({
                id: 'SymbolGeneralInfo',
                mode: 'MERGE',
                isSnapShot: 'yes',
                adapterName: 'RamandRLCDData',
                items: [selectedSymbol],
                fields: [
                    'yesterdayClosingPrice',
                    'lowThreshold',
                    'highThreshold',
                    'individualBuyVolume',
                    'numberOfIndividualSellers',
                    'individualSellVolume',
                    'numberOfLegalBuyers',
                    'legalBuyVolume',
                    'numberOfLegalSellers',
                    'legalSellVolume',
                    'totalTradeValue',
                    'totalNumberOfSharesTraded',
                    'baseVolume',
                    'firstTradedPrice',
                    'lastTradedPrice',
                    'lastTradedPriceVar',
                    'lastTradedPriceVarPercent',
                    'closingPrice',
                    'closingPriceVar',
                    'closingPriceVarPercent',
                    'lastTradeDateTime',
                    'lowestTradePriceOfTradingDay',
                    'highestTradePriceOfTradingDay',
                    'symbolState',
                ],
                onFieldsUpdate: ({ changedFields, itemName }) => {
    
                    queryClient.setQueryData(['SymbolGeneralInfo', itemName], (oldData: SymbolGeneralInfoType | undefined) => {
                        
                        const tempObj: { symbolData: any; individualLegal: any } = { symbolData: {}, individualLegal: {} };
                        const { symbolData, individualLegal } = oldData || tempObj;

                        const symbolDataChanged: typeof symbolData = {};
                        const individualLegalChanged: typeof individualLegal = {};

                        for (const [key, value] of Object.entries(changedFields)) {
                            if (symbolData?.hasOwnProperty(key) && value !== null) symbolDataChanged[key] = value;
                            if (individualLegal?.hasOwnProperty(key) && value !== null) individualLegalChanged[key] = value;
                        }

                        tempObj['symbolData'] = { ...symbolData, ...symbolDataChanged };
                        tempObj['individualLegal'] = { ...individualLegal, ...individualLegalChanged };
                        console.log("symbolData", symbolData);
                        return { ...oldData, ...tempObj };
                    });
                },
            });
        },
    });

    useEffect(() => {
        return () => {
            remove();
        };
    }, [selectedSymbol]);

    return (
        <div className="w-full grid grid-rows-min-one gap-2 overflow-y-clip h-full ">
            <SymbolSearch placeholder="جستجوی نماد" />

            <SymbolData />
        </div>
    );
};

export default SymbolDetail;
