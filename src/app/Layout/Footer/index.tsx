import PriceView from 'src/common/components/PriceView';
import PushEngineInfo from './PushEngineInfo';
import ScrollableSlider from 'src/common/components/ScrollableSlider/ScrollableSlider';
import { useMemo } from 'react';
import { PinIcon } from 'src/common/icons';
import { useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import PriceViewFooter from './priceViewFooter';

const Footer = () => {

    const { data: watchlistSymbolList } = useWatchListSymbolsQuery(
        { watchlistId: 3, watchlistType: "Pinned", PageNumber: 1 }
    )


    const itemsScrollableSlider = useMemo(() => (
        <>
            {
                watchlistSymbolList?.map(item => (
                    <PriceViewFooter key={item.symbolISIN} price={item.lastTradedPrice} percentage={item.lastTradedPriceVarPercent} label={item.symbolTitle} />
                ))
            }
        </>
    ), [watchlistSymbolList])


    return (
        <div className="w-auto bg-L-basic dark:bg-D-basic dark:text-L-basic text-D-basic text-1.2 h-[32px] max-w-full  items-center mx-4 mb-2 box-border grid grid-cols-min-one rounded">
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
