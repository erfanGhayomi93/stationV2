import PriceView from 'src/common/components/PriceView';
import PushEngineInfo from './PushEngineInfo';
import ScrollableSlider from 'src/common/components/ScrollableSlider/ScrollableSlider';
import { useMemo } from 'react';
import { PinIcon } from 'src/common/icons';

const Footer = () => {

    const itemsScrollableSlider = useMemo(() => (
        <>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={1200} percentage={-0.5} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={12354} percentage={0.5} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className={`flex mx-2 flex-nowrap whitespace-nowrap snap-center`}>
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
        </>
    ), [])


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
