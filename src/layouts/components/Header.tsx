import { CloseIcon, UpArrowIcon } from '@assets/icons';
import LastPriceTitle from '@components/LastPriceTitle';
import SearchSymbol from '@components/searchSymbol';
import Dropdown from '@uiKit/Dropdown';
import { useSymbolManager } from '@zustand/symbol';
import clsx from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';
import ProfileDropdown from './ProfileDropdown';

const HeaderLayout = () => {
     const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

     const [isLaptop, setIsLaptop] = useState(false);

     const [searchSymbol, setSearchSymbol] = useState<SearchSymbol | null>(null);

     const { tabsSymbol, setTabSymbol, selectedSymbol, setSelectedSymbol } = useSymbolManager();

     const refDropdown = useRef<HTMLDivElement>(null);

     const handleClickSymbol = (symbolISIN: string) => {
          const instanceTabSymbol: SearchSymbol[] = [...tabsSymbol];

          const symbol: SearchSymbol | undefined = instanceTabSymbol.find(item => item.symbolISIN === symbolISIN);
          const otherData = instanceTabSymbol.filter(item => item.symbolISIN !== symbolISIN);

          symbol && setTabSymbol([{ ...symbol }, ...otherData]);

          setSelectedSymbol(symbolISIN);

          setIsDropdownOpen(false);
     };

    useEffect(() => {
        console.log('tabsSymbol', tabsSymbol)
    }, [tabsSymbol])


    const handleSetSelectedSymbol = (symbol: SearchSymbol | null) => {
        if (!symbol) return;

          setSearchSymbol(symbol);

          setSelectedSymbol(symbol.symbolISIN);

          const isExist = tabsSymbol.some(item => item.symbolISIN === symbol?.symbolISIN);
          if (isExist) {
               return;
          }
          setTabSymbol([...tabsSymbol, { ...symbol }]);
     };

    const handleRemoveTabSymbol = (symbolISIN: string) => {s
        const instanceTabSymbol: SearchSymbol[] = tabsSymbol.map(item => ({ ...item }))

        const findIndex = instanceTabSymbol.findIndex(item => item.symbolISIN === symbolISIN)

        if (findIndex !== -1) {
            instanceTabSymbol.splice(findIndex, 1)
            setTabSymbol([...instanceTabSymbol])
            setSelectedSymbol(instanceTabSymbol[findIndex === 0 ? 0 : findIndex - 1].symbolISIN)
        }
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)');
        setIsLaptop(mediaQuery.matches);
    }, []);

     return (
          <div className="flex h-full justify-between px-4">
               <div className="flex flex-1 items-center gap-x-2">
                    <div className="flex items-center" ref={refDropdown}>
                         <button
                              className="flex items-center rounded-lg bg-back-2 p-3"
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                              disabled={!tabsSymbol.length}
                         >
                              <UpArrowIcon
                                   className={clsx('h-min text-icon-default transition-transform', {
                                        'rotate-180': !isDropdownOpen,
                                        'text-icon-disable': !tabsSymbol.length,
                                   })}
                              />
                         </button>

                         {!!isDropdownOpen && (
                              <Dropdown<SearchSymbol>
                                   ref={refDropdown}
                                   isDropdownOpen={isDropdownOpen}
                                   closeDropDowns={() => setIsDropdownOpen(false)}
                                   data={tabsSymbol}
                                   classes={{ position: 'top-10 -left-9' }}
                                   animate="fadeInDown"
                                   getLabel={option => (
                                        <LastPriceTitle
                                             PriceVar={option.lastTradedPriceVar}
                                             price={option.lastTradedPrice}
                                             symbolISIN={option.symbolISIN}
                                             symbolTitle={option.symbolTitle}
                                             key={option.symbolISIN}
                                             onClick={handleClickSymbol}
                                             isSelected={selectedSymbol === option.symbolISIN}
                                        />
                                   )}
                              />
                         )}
                    </div>

                <div className='flex flex-1 items-center h-full'>
                    {
                        tabsSymbol
                            .slice(0, isLaptop ? 4 : 7)
                            .map((item, ind) => (
                                <Fragment key={item?.symbolISIN || ind}>

                                    <div className={clsx('px-5 h-full flex items-center transition-colors cursor-pointer', {
                                        'rounded-t-xl bg-back-2': selectedSymbol === item?.symbolISIN
                                    })}>
                                        {
                                            (item?.symbolISIN === selectedSymbol && tabsSymbol.length !== 1) && (
                                                <CloseIcon
                                                    width={10}
                                                    height={10}
                                                    className='text-icon-default'
                                                    onClick={() => handleRemoveTabSymbol(item?.symbolISIN)}
                                                />
                                            )
                                        }
                                        <LastPriceTitle
                                             PriceVar={item?.lastTradedPriceVar}
                                             price={item?.lastTradedPrice}
                                             symbolISIN={item?.symbolISIN}
                                             symbolTitle={item?.symbolTitle}
                                             key={item?.symbolISIN}
                                             onClick={() => setSelectedSymbol(item?.symbolISIN)}
                                             isSelected={selectedSymbol === item?.symbolISIN}
                                        />
                                   </div>

                                   <span
                                        className={clsx(
                                             `h-4 w-[1px] bg-line-div-1 last:opacity-0 ${!!tabsSymbol && tabsSymbol[ind + 1]?.symbolISIN === selectedSymbol ? 'opacity-0' : ''} `,
                                             {
                                                  'opacity-0': item?.symbolISIN === selectedSymbol,
                                             }
                                        )}
                                   ></span>
                              </Fragment>
                         ))}
                    </div>
               </div>

               <div className="flex w-1/5 items-center justify-end gap-x-4">
                    <div className="w-80">
                         <SearchSymbol searchSymbol={searchSymbol} setSearchSymbol={handleSetSelectedSymbol} />
                    </div>

                    <ProfileDropdown />
               </div>
          </div>
     );
};

export default HeaderLayout;
