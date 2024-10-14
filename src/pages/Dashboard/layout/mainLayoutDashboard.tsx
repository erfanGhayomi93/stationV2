import { UpArrowIcon } from '@assets/icons';
import Popup from '@components/popup';
import clsx from 'clsx';
import BuySellWidget from 'common/widget/buySellWidget';
import { useTranslation } from 'react-i18next';
import { MainSymbol } from '../widget/HeaderSymbol';
import OrderBookTabsWidget from '../widget/orderBookTabsWidget';
import SliderbarDetailsWidget from '../widget/sliderbarDetailsWidget';
import TodayOrdersWidget from '../widget/TodayOrdersWidget';
import TodayTradesWidget from '../widget/TodayTradesWidget';

const BoxClass = 'p-2 bg-back-surface shadow-sm rounded-lg';

const MainLayoutDashboard = () => {
     const { t } = useTranslation();

     return (
          <div className="rtl mx-2 grid h-full grid-cols-2 gap-2">
               <div className="grid h-full grid-rows-min-one gap-2">
                    <div className={BoxClass}>
                         <MainSymbol />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                         <div className={clsx(BoxClass, 'w-full')}>
                              <OrderBookTabsWidget />
                         </div>
                         <div className={clsx('grid h-full grid-rows-2 gap-2')}>
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
                    <Popup
                         margin={{
                              y: 8,
                         }}
                         defaultPopupWidth={200}
                         renderer={({ setOpen }) => (
                              <ul className="rtl flex flex-col gap-4 rounded-md bg-white px-4 py-3 shadow-E2">
                                   {['constant', 'increase', 'decrease'].map((item, index) => (
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        //@ts-expect-error
                                        <li key={index}>{t('todayOrders.' + item)}</li>
                                   ))}
                              </ul>
                         )}
                    >
                         {({ setOpen, open }) => (
                              <div
                                   onClick={() => setOpen(!open)}
                                   style={{ width: '10rem' }}
                                   className="flex items-center justify-between gap-2 rounded-lg border border-input-default bg-back-surface p-2 text-content-title"
                              >
                                   <input value={3} className="w-full border-none bg-transparent outline-none" />
                                   <UpArrowIcon width="0.8rem" height="0.8rem" className="rotate-180" />
                              </div>
                         )}
                    </Popup>
               </div>
          </div>
     );
};

export default MainLayoutDashboard;
