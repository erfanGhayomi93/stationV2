import { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import BuySellWidget from 'src/widgets/BuySell/context/BuySellContext';
import PortfolioWatchlist from 'src/widgets/PortfolioWatchlist';
import Reports from 'src/widgets/Reports';
import SymbolDetail from 'src/widgets/SymbolDetail';

const Home = () => {
    //
    const appDispatch = useAppDispatch();
    useEffect(() => {
        return () => {
            appDispatch(setSelectedCustomers([]));
        };
    }, []);

    return (
        <div className="grid gap-2 grid-cols-12 overflow-y-auto  ">
            <div className="col-span-9">
                <div className="grid h-full grid-cols-9 grid-rows-min-one gap-2 ">
                    <div className="col-span-6">
                        <PortfolioWatchlist />
                    </div>
                    <div className="col-span-3 min-h-[475px]">
                        <BuySellWidget />
                    </div>
                    <div className="col-span-9">
                        <Reports />
                    </div>
                </div>
            </div>
            <div className="col-span-3 gap-2 grid h-full grid-cols-3 overflow-y-auto ">
                <div className="col-span-3    overflow-y-auto">
                    <SymbolDetail />
                </div>
            </div>
        </div>
    );
};

export default Home;
