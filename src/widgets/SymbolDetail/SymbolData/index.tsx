import { useMemo, useState } from 'react';
import SymbolHeader from './SymbolHeader';
import SymbolPriceBar from './SymbolPriceBar';
import SymbolPricePreview from './SymbolPricePreview';
import AdditionalData from './tabs/AdditionalData';
import Charts from './tabs/Charts';
import Details from './tabs/Details';
import Messages from './tabs/Messages';
import Orders from './tabs/Orders';

const SymbolData = () => {
    //
    const [activeTab, setActiveTab] = useState('Orders');

    const items = useMemo(
        () => [
            {
                key: 'Orders',
                title: 'صف',
                content: <Orders />,
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'AdditionalData',
                title: 'حقیقی حقوقی',
                content: <AdditionalData />,
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Details',
                title: 'جزییات نماد',
                content: <Details />,
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Charts',
                title: 'نمودار نماد',
                content: <Charts />,
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Messages',
                title: 'پیام ها',
                content: <Messages />,
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
        ],
        [],
    );

    return (
        <div className="bg-L-basic dark:bg-D-basic h-full w-full ">
            <div className=" grid grid-cols-1 grid-rows-min-one  p-3 gap-2 h-full  ">
                <div className="sticky top-0 z-10 bg-L-basic dark:bg-D-basic">
                    <SymbolHeader />
                    <SymbolPricePreview />
                    <SymbolPriceBar />
                </div>
                <div className=" grid w-full overflow-y-auto ">
                    <div>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus
                        soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus
                        soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta
                        beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                        adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure
                        facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit
                        dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                        adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure
                        facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit
                        dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                        adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure
                        facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit
                        dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                        adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure
                        facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit
                        dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                        adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure
                        facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit
                        dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                        adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure
                        facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit
                        dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                        adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure
                        facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit
                        dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                        adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure
                        facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit
                        dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                        adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure
                        facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit
                        dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                        adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure
                        facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit
                        dicta beatae amet repudiandae numquam doloribus quia ut iure facilis! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus consectetur adipisci ullam unde eveniet, id ducimus soluta libero modi velit dicta beatae amet repudiandae
                        numquam doloribus quia ut iure facilis! consectetur adipisicing elit. Voluptatibus consectetur adipisci ullam unde eveniet, id
                        ducimus soluta libero modi velit dicta beatae amet repudiandae numquam doloribus quia ut iure facilis!
                    </div>
                    {/* <TabsList
                        fill={true}
                        onChange={(idx) => setActiveTab(idx)}
                        selectedIndex={activeTab}
                        items={items}
                        buttonClass=" text-L-gray-500 dark:text-D-gray-500 "
                        className="w-full grid rounded-md relative text-1.2 overflow-y-scroll "
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default SymbolData;
