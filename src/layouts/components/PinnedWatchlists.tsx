import { PinnedIcon, UpArrowIcon } from '@assets/icons';
import LastPriceTitle, { ILastPriceTitleProps } from '@components/LastPriceTitle';
import Popup from '@components/popup';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

const initData: ILastPriceTitleProps[] = [
     {
          //   lastPrice: 56454,
          //   lastPriceVar: 3,
          symbolTitle: 'خساپا',
          isSelected: false,
          symbolISIN: '11111111111111',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 56454,
          //   lastPriceVar: 0,
          symbolTitle: 'شستا',
          isSelected: false,
          symbolISIN: '222',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 4234,
          //   lastPriceVar: -2,
          symbolTitle: 'ریشمک',
          isSelected: false,
          symbolISIN: '3333',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 5342,
          //   lastPriceVar: -1.6,
          symbolTitle: 'فمراد',
          isSelected: false,
          symbolISIN: '4441',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 56454,
          //   lastPriceVar: 3,
          symbolTitle: 'فخوز',
          isSelected: false,
          symbolISIN: '111111111111111',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 56454,
          //   lastPriceVar: 0,
          symbolTitle: 'شستا1',
          isSelected: false,
          symbolISIN: '2221',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 4234,
          //   lastPriceVar: -2,
          symbolTitle: 'ریشمک1',
          isSelected: false,
          symbolISIN: '33331',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 5342,
          //   lastPriceVar: -1.6,
          symbolTitle: 'فملی',
          isSelected: false,
          symbolISIN: '4441',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 56454,
          //   lastPriceVar: 3,
          symbolTitle: 'خساپا2',
          isSelected: false,
          symbolISIN: '1111111111111112',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 56454,
          //   lastPriceVar: 0,
          symbolTitle: 'شستا2',
          isSelected: false,
          symbolISIN: '22212',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 4234,
          //   lastPriceVar: -2,
          symbolTitle: 'ریشمک2',
          isSelected: false,
          symbolISIN: '333312',
          price: 20,
          PriceVar: 88,
     },
     {
          //   lastPrice: 5342,
          //   lastPriceVar: -1.6,
          symbolTitle: 'خساپا2',
          isSelected: false,
          symbolISIN: '44412',
          price: 20,
          PriceVar: 88,
     },
];

const PinnedWatchlists = () => {
     const [isLaptop, setIsLaptop] = useState(false);

     const [selectedItem, setselectedItem] = useState('222');

     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const refDropdown = useRef<HTMLDivElement>(null);

     useEffect(() => {
          const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)');
          setIsLaptop(mediaQuery.matches);
     }, []);

     return (
          <div className="flex items-center">
               <PinnedIcon className="text-icon-warning" />

               <div className="flex h-full items-center">
                    {initData.slice(0, isLaptop ? 2 : 4).map(item => (
                         <Fragment key={item.symbolISIN}>
                              <div
                                   className={clsx(
                                        'flex h-full cursor-pointer items-center gap-x-1 px-3 transition-colors last:pl-0'
                                   )}
                              >
                                   <LastPriceTitle
                                        {...item}
                                        onClick={() => setselectedItem(item.symbolISIN)}
                                        isSelected={selectedItem === item.symbolISIN}
                                   />
                              </div>
                         </Fragment>
                    ))}
               </div>

               <div className="relative">
                    <Popup
                         margin={{
                              x: -20,
                              y: -40,
                         }}
                         defaultPopupWidth={200}
                         onOpen={() => setIsDropdownOpen(true)}
                         onClose={() => setIsDropdownOpen(false)}
                         renderer={({ setOpen }) => (
                              <ul className="rtl flex flex-col gap-1 rounded-md bg-back-surface px-4 py-3 shadow-E6">
                                   {initData.map((item, index) => (
                                        <li className="flex w-full flex-1 justify-between rounded-md p-2 transition-colors hover:bg-back-primary">
                                             <LastPriceTitle
                                                  {...item}
                                                  key={index}
                                                  // onClick={handleClickSymbol}
                                                  isSelected={selectedItem === item.symbolISIN}
                                             />
                                        </li>
                                   ))}
                              </ul>
                         )}
                    >
                         {({ setOpen, open }) => (
                              <button className="flex items-center rounded-lg p-3" onClick={() => setOpen(!open)}>
                                   <UpArrowIcon
                                        className={clsx('h-min text-icon-default transition-transform', {
                                             'rotate-180': !isDropdownOpen,
                                        })}
                                   />
                              </button>
                         )}
                    </Popup>
               </div>
          </div>
     );
};

export default PinnedWatchlists;
