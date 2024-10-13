import clsx from 'clsx';
import BuySellWidget from 'common/widget/buySellWidget';
import { MainSymbol } from '../widget/HeaderSymbol';
import IndividualLegalWidget from '../widget/individualLegalWidget';
import SliderbarDetailsWidget from '../widget/sliderbarDetailsWidget';
import TodayOrdersWidget from '../widget/TodayOrdersWidget';
import OrderBookTabsWidget from '../widget/orderBookTabsWidget';

const BoxClass = 'p-2 bg-back-surface shadow-sm rounded-lg';

const MainLayoutDashboard = () => {
     return (
          <div className="rtl mx-2 my-2 flex gap-2">
               <div className="flex w-1/2 flex-col gap-2">
                    <div className={BoxClass}>
                         <MainSymbol />
                    </div>

                    <div className={clsx(BoxClass, 'h-[15.75em] overflow-auto')}>
                         <TodayOrdersWidget side={'Buy'} />
                    </div>

                    <div className={clsx(BoxClass, 'h-[15.75em]')}>
                         <TodayOrdersWidget side={'Sell'} />
                    </div>

                    <div className={clsx(BoxClass)}>
                         <BuySellWidget />
                    </div>
               </div>

               <div className={'w-1/2 flex flex-col gap-2'}>
                    <div className="flex gap-2 text-sm">
                         <div className={clsx(BoxClass, 'w-1/2')}>
                              <SliderbarDetailsWidget />
                         </div>
                         <div className={clsx(BoxClass, 'w-1/2')}>
                              <IndividualLegalWidget />
                         </div>
                    </div>
                    <div className={clsx(BoxClass , 'w-1/2')}>
                         <OrderBookTabsWidget />
                    </div>
               </div>
          </div>
     );
};

export default MainLayoutDashboard;
