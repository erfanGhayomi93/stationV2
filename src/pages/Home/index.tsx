import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { emptySelectedCustomers } from 'src/redux/slices/option';
import BuySellWidget from 'src/widgets/BuySell/context/BuySellContext';
import CustomerSearchContext from 'src/widgets/CustomerSearch/context/CustomerSearchContext';
import Reports from 'src/widgets/Reports';
import SymbolDetail from 'src/widgets/SymbolDetail';
import styles from './style.module.scss';
import clsx from 'clsx';
import { getHomeLayout } from 'src/redux/slices/ui';

const Home = () => {
    //
    const homeLayout = useAppSelector(getHomeLayout)
    const appDispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            appDispatch(emptySelectedCustomers());
        };
    }, []);

    const CustomersSection = () => {
        return (
            <div className={styles['customers-section']}>
                <div className="grid h-full grid-cols-9 grid-rows-min-one gap-2 ">
                    <div className="col-span-6">
                        <CustomerSearchContext />
                    </div>
                    <div className="col-span-3 h-fit">
                        <BuySellWidget />
                    </div>
                    <div className="col-span-9">
                        <Reports />
                    </div>
                </div>
            </div>
        );
    };

    const SymbolSection = () => {
        return (
            <div className={styles['symbol-section']}>
                <SymbolDetail />
            </div>
        );
    };

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
