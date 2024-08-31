import PushEngineInfo from './PushEngineInfo';
import ScrollableSlider from 'src/common/components/ScrollableSlider/ScrollableSlider';
import { useEffect, useMemo, useRef } from 'react';
import { PinIcon } from 'src/common/icons';
import { useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import PriceViewFooter from './priceViewFooter';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import ipcMain from 'src/common/classes/IpcMain';
import { pushEngine } from 'src/ls/pushEngine';
import UseDebounceOutput from 'src/common/hooks/UseDebounceOutput';
import { queryClient } from 'src/app/queryClient';
import { queryKeyWatchlistSymbol } from 'src/constant/watchlist';

const Footer = () => {

    const dispatch = useAppDispatch()

    const { setDebounce } = UseDebounceOutput()

    const refData = useRef<IGetWatchlistSymbol[]>([])

    const { data: watchlistSymbolList, refetch } = useWatchListSymbolsQuery(
        { watchlistType: "Pinned", PageNumber: 1 },
        {
            onSuccess: (data) => {
                pushEngine.unSubscribe("WatchlistSymbol")
                if (!data || data.length === 0) return;

                const symbolISINs: string[] = [];
                data.forEach((symbol) => {
                    symbolISINs.push(symbol.symbolISIN);
                });

                refData.current = JSON.parse(JSON.stringify(data));

                pushEngine.subscribe<Partial<IGetWatchlistSymbol>>({
                    id: 'WatchlistSymbol',
                    mode: 'MERGE',
                    isSnapShot: 'yes',
                    adapterName: 'RamandRLCDData',
                    items: data.map((watchlist) => watchlist?.symbolISIN),
                    fields: ['totalNumberOfSharesTraded', 'lastTradedPrice', 'lastTradedPriceVarPercent'],
                    onFieldsUpdate: ({ changedFields, itemName }) => {

                        // if (itemName === 'IRO1FOLD0001') {
                        //     console.log({
                        //         changedFields,
                        //         itemName,
                        //     });
                        // }

                        if (refData.current.length > 0) {
                            const effectedSymbol = refData.current.find((symbol) => symbol.symbolISIN === itemName) as IGetWatchlistSymbol;

                            const inx = refData.current.findIndex((symbol) => symbol.symbolISIN === itemName);

                            const updatedSymbol = {
                                ...effectedSymbol,
                                ...changedFields,
                            };

                            if (refData.current) {
                                refData.current[inx] = updatedSymbol;
                            }

                        }

                        setDebounce(() => {
                            queryClient.setQueryData(queryKeyWatchlistSymbol({ PageNumber: 1, watchlistType: 'Pinned' }), _ => [...refData.current])
                        }, 1000);

                    },
                });

            }
        }
    )


    const clickSymbol = (symbolISIN: string) => {
        dispatch(setSelectedSymbol(symbolISIN));
    }

    const refetchPinnedWatchlist = () => {
        refetch();
    }


    const itemsScrollableSlider = useMemo(() => (
        <>
            {
                watchlistSymbolList?.map(item => (
                    <PriceViewFooter
                        key={item.symbolISIN}
                        price={item.lastTradedPrice}
                        percentage={item.lastTradedPriceVarPercent}
                        label={item.symbolTitle}
                        symbolISIN={item.symbolISIN}
                        clickSymbol={clickSymbol}
                    />
                ))
            }
        </>
    ), [watchlistSymbolList])

    useEffect(() => {
        ipcMain.handle('refetchPinnedWatchlist', refetchPinnedWatchlist)

        return () => ipcMain.removeChannel('refetchPinnedWatchlist')
    }, [])



    return (
        <div className="w-auto bg-L-basic dark:bg-D-basic dark:text-L-basic text-D-basic text-1.2 h-8 max-w-full  items-center mx-4 mb-2 box-border grid grid-cols-min-one rounded">
            <div className="h-full overflow-hidden w-[50%] flex items-center">
                <PinIcon className='text-L-warning dark:text-D-warning ml-2 mr-7' />

                <ScrollableSlider>
                    {itemsScrollableSlider}
                </ScrollableSlider>
            </div>
            <div className="flex h-full p-2 items-center whitespace-nowrap">
                <div className="h-full mx-1 " />
                <PushEngineInfo />
            </div>
        </div>
    );
};

export default Footer;
