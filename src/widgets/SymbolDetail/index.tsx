import { useQueryClient } from '@tanstack/react-query';
import { pushEngine } from 'src/ls/pushEngine';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { useAppSelector } from 'src/redux/hooks';
import SymbolSearch from './SymbolSearch';
import { getSelectedSymbol } from 'src/redux/slices/option';
import SymbolData from './SymbolData';
import { IpoData } from './SymbolData/IpoData';
import { useMemo, useRef } from 'react';
import UseDebounceOutput from 'src/common/hooks/UseDebounceOutput';

type SymbolDataKey = keyof SymbolData;
type IndividualLegalKey = keyof IndividualLegal;

const SymbolDetail = () => {
    //
    const selectedSymbol = useAppSelector(getSelectedSymbol)

    const queryClient = useQueryClient();
    // isLoading or isFetching ? depends ...

    const refData = useRef<SymbolGeneralInfoType>()

    const { setDebounce } = UseDebounceOutput()


    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        onSuccess: (data) => {
            pushEngine.unSubscribe("SymbolGeneralInfoo")

            refData.current = JSON.parse(JSON.stringify(data));

            pushEngine.subscribe({
                id: 'SymbolGeneralInfoo',
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
                    'openPrice'
                ],
                onFieldsUpdate: ({ changedFields, itemName }) => {
                    const tempObj: { symbolData: Partial<SymbolData>; individualLegal: Partial<IndividualLegal> } = { symbolData: {}, individualLegal: {} };

                    const { symbolData, individualLegal } = refData.current || tempObj;

                    const symbolDataChanged: Partial<SymbolData> = {};

                    const individualLegalChanged: Partial<IndividualLegal> = {};

                    for (const [key, value] of Object.entries(changedFields)) {
                        if (value !== null) {
                            if (symbolData && key in symbolData) {
                                symbolDataChanged[key as SymbolDataKey] = value as SymbolData[SymbolDataKey];
                            }
                            if (individualLegal && key in individualLegal) {
                                individualLegalChanged[key as IndividualLegalKey] = value as IndividualLegal[IndividualLegalKey];
                            }
                        }
                    }

                    tempObj['symbolData'] = { ...symbolData, ...symbolDataChanged };
                    tempObj['individualLegal'] = { ...individualLegal, ...individualLegalChanged };

                    setDebounce(() => {
                        queryClient.setQueryData(['SymbolGeneralInfo', itemName], () => {

                            return { ...refData.current, ...tempObj };
                        });
                    }, 1000)
                }
            });
        },
    });

    const isIpo = useMemo(() => (data as SymbolGeneralInfoType)?.symbolData?.isIpo || false, [data]);

    return (
        <div className="w-full grid grid-rows-min-one gap-2 overflow-y-clip h-full ">
            <SymbolSearch placeholder="جستجوی نماد" />

            {!isIpo && <SymbolData />}

            {isIpo && <IpoData selectedSymbol={selectedSymbol} />}
        </div>
    );
};

export default SymbolDetail;
