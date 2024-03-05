import { useEffect, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { emptySelectedCustomers, getSelectedSymbol } from 'src/redux/slices/option';
import BuySellWidget from 'src/widgets/BuySell/context/BuySellContext';
import CustomerSearchContext from 'src/widgets/CustomerSearch/context/CustomerSearchContext';
import Reports from 'src/widgets/Reports';
import SymbolDetail from 'src/widgets/SymbolDetail';
import styles from './style.module.scss';
import clsx from 'clsx';
import { getHomeLayout } from 'src/redux/slices/ui';
import { queryClient } from 'src/app/queryClient';

const Home = () => {
    const homeLayout = useAppSelector(getHomeLayout);
    const appDispatch = useAppDispatch();

    const selectedSymbol = useAppSelector(getSelectedSymbol);
    const symbolGeneralInfo = useMemo(
        () => queryClient.getQueryData(["SymbolGeneralInfo", selectedSymbol]),
        [selectedSymbol]
    );
    const isIpo = useMemo(() => (symbolGeneralInfo as SymbolGeneralInfoType)?.symbolData.isIpo || false, [symbolGeneralInfo]);

    const clearSelectedCustomers = useCallback(() => {
        appDispatch(emptySelectedCustomers());
    }, [appDispatch]);

    useEffect(() => {
        return () => {
            clearSelectedCustomers();
        };
    }, [clearSelectedCustomers]);

    const CustomersSection = useCallback(() => {
        return (
            <div className={styles['customers-section']}>
                <div className="grid h-full grid-cols-9 grid-rows-min-one gap-2 ">
                    <div className={
                        clsx("min-h-[434px]", {
                            "col-span-6": !isIpo,
                            "col-span-9": !!isIpo
                        })
                    }>
                        <CustomerSearchContext />
                    </div>
                    {!isIpo && (
                        <div className="h-fit col-span-3 min-h-[434px]">
                            <BuySellWidget />
                        </div>
                    )}
                    <div className="col-span-9">
                        <Reports />
                    </div>
                </div>
            </div>
        );
    }, [isIpo]);

    const SymbolSection = useCallback(() => {
        return (
            <div className={styles['symbol-section']}>
                <SymbolDetail />
            </div>
        );
    }, []);

    return (
        <div className={clsx(styles.container, {
            [styles.toggle]: homeLayout === 'ltr'
        })}>
            <CustomersSection />
            <SymbolSection />
        </div >
    );
};

export default Home;