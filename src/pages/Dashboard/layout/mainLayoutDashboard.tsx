import { ArrowDownTriangleIcon } from '@assets/icons';
import { useUIStore } from '@store/ui';
import clsx from 'clsx';
import BuySellWidget from 'common/widget/buySellWidget';
import { MainSymbol } from '../widget/HeaderSymbol';
import OrderBookTabsWidget from '../widget/orderBookTabsWidget';
import SliderbarDetailsWidget from '../widget/sliderbarDetailsWidget';
import TodayOrdersWidget from '../widget/TodayOrdersWidget';
import TodayTradesWidget from '../widget/TodayTradesWidget';

const BoxClass = 'p-4 bg-back-surface shadow-sm rounded-lg rtl overflow-x-hidden overflow-y-auto';

const MainLayoutDashboard = () => {
     const { isExpandSymbolDetails, setExpandSymbolDetails } = useUIStore();

     return (
          <div className="rtl grid h-full grid-cols-[2fr,2fr,4fr] gap-2 overflow-hidden">
               <div className="grid h-full grid-rows-min-one gap-2 overflow-hidden">
                    <div className={BoxClass}>
                         <MainSymbol />
                    </div>

                    <div className={clsx(BoxClass)}>
                         <OrderBookTabsWidget />
                    </div>
               </div>

               <div className="grid-rows-[min-content max-content 1fr] grid gap-2">
                    {/* <div className={clsx('grid h-full grid-rows-2 gap-2')}> */}
                    <div className={clsx(BoxClass)}>
                         <SliderbarDetailsWidget />
                    </div>

                    <button
                         onClick={() => setExpandSymbolDetails(!isExpandSymbolDetails)}
                         className="flex cursor-pointer items-center justify-center"
                    >
                         <div style={{ minHeight: '1px' }} className="w-full flex-1 bg-line-div-2" />
                         <div className="px-1">
                              <ArrowDownTriangleIcon
                                   className={clsx(
                                        'text-icon-default transition-transform',
                                        isExpandSymbolDetails && 'rotate-180'
                                   )}
                              />
                         </div>
                         <div style={{ minHeight: '1px' }} className="w-full flex-1 bg-line-div-2" />
                    </button>
                    <div className={clsx(BoxClass)}>
                         <BuySellWidget />
                    </div>
               </div>

               <div className={'grid h-full grid-rows-3 gap-2 overflow-hidden'}>
                    <div className={clsx(BoxClass)}>
                         <TodayOrdersWidget side={'Buy'} />
                    </div>

                    <div className={clsx(BoxClass)}>
                         <TodayOrdersWidget side={'Sell'} />
                    </div>

                    <div className={clsx(BoxClass)}>
                         <TodayTradesWidget />
                    </div>
               </div>
          </div>
     );
};

export default MainLayoutDashboard;
