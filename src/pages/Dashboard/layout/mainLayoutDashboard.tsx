import clsx from 'clsx';
import { MainSymbol } from '../widget/HeaderSymbol';
// import IndividualLegalWidget from '../widget/individualLegalWidget';
import SliderbarDetailsWidget from '../widget/sliderbarDetailsWidget';
import TodayOrdersWidget from '../widget/TodayOrdersWidget';
import OrderBookTabsWidget from '../widget/orderBookTabsWidget';
import TodayTradesWidget from '../widget/TodayTradesWidget';
import BuySellWidget from 'common/widget/buySellWidget';

const BoxClass = 'p-2 bg-back-surface shadow-sm rounded-lg';

const MainLayoutDashboard = () => {
     return (
          <div className="rtl mx-2 gap-2 h-full grid grid-cols-2">
               <div className="gap-2 h-full grid grid-rows-min-one">
                    <div className={BoxClass}>
                         <MainSymbol />
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                         <div className={clsx(BoxClass, "w-full")}>
                              <OrderBookTabsWidget />
                         </div>
                         <div className={clsx('gap-2 h-full grid grid-rows-2')}>
                              <div className={clsx(BoxClass, 'w-full')}>
                                   <SliderbarDetailsWidget />
                              </div>
                              {/* <div className={clsx(BoxClass)}>
                                        <IndividualLegalWidget />
                                   </div> */}
                              <div className={clsx(BoxClass, 'overflow-auto')}>
                                   <BuySellWidget />
                              </div>
                         </div>
                    </div>
               </div>

               <div className={'gap-2 h-full grid grid-rows-3'}>
                    <div className={clsx(BoxClass, 'overflow-auto')}>
                         <TodayOrdersWidget side={'Buy'} />
                    </div>

                    <div className={clsx(BoxClass, 'overflow-auto')}>
                         <TodayOrdersWidget side={'Sell'} />
                    </div>

                    <div className={clsx(BoxClass, ' overflow-auto')}>
                         <TodayTradesWidget />
                    </div>
               </div>
          </div>
     );
};

export default MainLayoutDashboard;
