import React from 'react';
import BuySell from 'src/common/widgets/BuySell';
import CustomerSearch from 'src/common/widgets/CustomerSearch';
import PortfolioWatchlist from 'src/common/widgets/PortfolioWatchlist';
import Reports from 'src/common/widgets/Reports';
import SymbolDetail from 'src/common/widgets/SymbolDetail';

const Layout = () => {
    //
    return (
        <div className="flex h-full">
            <div className="flex flex-col pl-3" style={{ width: '25%' }}>
                <div className="pb-3" style={{ height: '60%' }}>
                    <SymbolDetail />
                </div>
                <div style={{ height: '40%' }}>
                    <CustomerSearch />
                </div>
            </div>
            <div className="flex flex-col" style={{ width: '75%' }}>
                <div className="flex pb-3" style={{ height: '50%' }}>
                    <div className="pl-3" style={{ width: '40%' }}>
                        <BuySell />
                    </div>
                    <div style={{ width: '60%' }}>
                        <PortfolioWatchlist />
                    </div>
                </div>
                <div style={{ height: '50%' }}>
                    <Reports />
                </div>
            </div>
        </div>
    );
};

export default Layout;
