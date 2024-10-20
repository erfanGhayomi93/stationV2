import clsx from 'clsx';
import BuySellWidget from 'common/widget/buySellWidget';
import { useTranslation } from 'react-i18next';
import { MainSymbol } from '../widget/HeaderSymbol';
import OrderBookTabsWidget from '../widget/orderBookTabsWidget';
import SliderbarDetailsWidget from '../widget/sliderbarDetailsWidget';
import TodayOrdersWidget from '../widget/TodayOrdersWidget';
import TodayTradesWidget from '../widget/TodayTradesWidget';

const BoxClass = 'p-4 bg-back-surface shadow-sm rounded-lg rtl overflow-y-auto';

const MainLayoutDashboard = () => {
     const { t } = useTranslation();

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

               <div className="grid grid-rows-min-one gap-2">
                    {/* <div className={clsx('grid h-full grid-rows-2 gap-2')}> */}
                    <div className={clsx(BoxClass)}>
                         <SliderbarDetailsWidget />
                    </div>
                    {/* <div className={clsx(BoxClass)}>
                                        <IndividualLegalWidget />
                                   </div> */}
                    <div className={clsx(BoxClass, 'overflow-auto')}>
                         <BuySellWidget />
                    </div>
                    {/* </div> */}
               </div>

               <div className={'grid h-full grid-rows-3 gap-2'}>
                    <div className={clsx(BoxClass, 'overflow-auto')}>
                         <TodayOrdersWidget side={'Buy'} />
                    </div>

                    <div className={clsx(BoxClass, 'overflow-auto')}>
                         <TodayOrdersWidget side={'Sell'} />
                    </div>

                    <div className={clsx(BoxClass, 'overflow-auto')}>
                         <TodayTradesWidget />
                    </div>
               </div>
          </div>
     );
};

export default MainLayoutDashboard;
