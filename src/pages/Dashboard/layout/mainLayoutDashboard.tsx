import { ArrowDownTriangleIcon } from '@assets/icons';
import { useUIStore } from '@store/ui';
import clsx from 'clsx';
import BuySellWidget from 'common/widget/buySellWidget';
import { MainSymbol } from '../widget/HeaderSymbol';
import OrderBookTabsWidget from '../widget/orderBookTabsWidget';
import SliderbarDetailsWidget from '../widget/sliderbarDetailsWidget';
import TodayOrdersWidget from '../widget/TodayOrdersWidget';
import TodayTradesWidget from '../widget/TodayTradesWidget';

const BoxClass = 'bg-back-surface shadow-sm rounded-lg overflow-x-hidden overflow-y-auto box-border';

const MainLayoutDashboard = () => {
     const { isExpandSymbolDetails, setExpandSymbolDetails } = useUIStore();

     return (
          <div className="rtl grid grid-cols-[1fr,1fr,2fr] gap-2 h-full">
               <div className="grid grid-rows-min-one gap-2">
                    <div className={BoxClass}>
                         <MainSymbol />
                    </div>

                    <div className={clsx(BoxClass)}>
                         <OrderBookTabsWidget />
                    </div>
               </div>



               <div className="grid grid-rows-min-min-one gap-2 h-full overflow-hidden">
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



               <div className={'grid grid-rows-3 gap-2 pl-4'}>
                    <div className={clsx(BoxClass, 'p-4')}>
                         <TodayOrdersWidget side={'Buy'} />
                    </div>

                    <div className={clsx(BoxClass, 'p-4')}>
                         <TodayOrdersWidget side={'Sell'} />
                    </div>

                    <div className={clsx(BoxClass, 'p-4')}>
                         <TodayTradesWidget />
                    </div>
               </div>
          </div>
     );
};

export default MainLayoutDashboard;
