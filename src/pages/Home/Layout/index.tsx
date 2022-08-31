import React from 'react';
import BuySell from 'src/common/widgets/BuySell';
import CustomerSearch from 'src/common/widgets/CustomerSearch';
import PortfolioWatchlist from 'src/common/widgets/PortfolioWatchlist';
import Reports from 'src/common/widgets/Reports';
import SymbolDetail from 'src/common/widgets/SymbolDetail';

const Layout = () => {
    //
    return (
        <div className="grid gap-2 h-full grid-cols-12">
            <div className="col-span-3 gap-2 grid h-full grid-cols-3">
                <div className="col-span-3">
                    <SymbolDetail />
                </div>
                <div className="col-span-3">
                    <CustomerSearch />
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

export default Layout;
