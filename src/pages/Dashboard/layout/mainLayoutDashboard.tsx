import { UpArrowIcon } from '@assets/icons';
import Popup from '@components/popup';
import clsx from 'clsx';
import BuySellWidget from 'common/widget/buySellWidget';
import { useTranslation } from 'react-i18next';
import { MainSymbol } from '../widget/HeaderSymbol';
import IndividualLegalWidget from '../widget/individualLegalWidget';
import SliderbarDetailsWidget from '../widget/sliderbarDetailsWidget';
import TodayOrdersWidget from '../widget/TodayOrdersWidget';
import TodayTradesWidget from '../widget/TodayTradesWidget';

const BoxClass = 'p-2 bg-back-surface shadow-sm rounded-lg';

const MainLayoutDashboard = () => {
     const { t } = useTranslation();

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

               <div className={'flex w-1/2 flex-col gap-2'}>
                    <div className="flex gap-2 text-sm">
                         <div className={clsx(BoxClass, 'w-1/2')}>
                              <SliderbarDetailsWidget />
                         </div>
                         <div className={clsx(BoxClass, 'w-1/2')}>
                              <IndividualLegalWidget />
                         </div>
                    </div>

                    <div className={clsx(BoxClass, 'h-[15.75em] overflow-auto')}>
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
