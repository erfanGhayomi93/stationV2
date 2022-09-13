import BuySell from 'src/widgets/BuySell';
import CustomerSearchWidget from 'src/widgets/CustomerSearch/context/CustomerSearchContext';
import PortfolioWatchlist from 'src/widgets/PortfolioWatchlist';
import Reports from 'src/widgets/Reports';
import SymbolDetail from 'src/widgets/SymbolDetail';

const Home = () => {
    //
    return (
        <div className="grid gap-2 h-full grid-cols-12 overflow-y-auto ">
            <div className="col-span-3 gap-2 grid h-full grid-cols-3 grid-rows-60-40  overflow-y-auto ">
                <div className="col-span-3    overflow-y-auto">
                    <SymbolDetail />
                </div>
                <div className="col-span-3 grid h-full overflow-y-auto">
                    <CustomerSearchWidget />
                </div>
            </div>
            <div className="col-span-9">
                <div className="grid h-full grid-cols-9 grid-rows-2 gap-2">
                    <div className="col-span-3">
                        <BuySell />
                    </div>
                    <div className="col-span-6">
                        <PortfolioWatchlist />
                    </div>
                    <div className="col-span-9">
                        <Reports />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
