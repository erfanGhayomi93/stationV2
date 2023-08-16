import { useEffect } from 'react';
import { useWorkflowState } from 'src/common/components/WorkFlow/context/WorkflowContext';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import BuySellWidget from 'src/widgets/BuySell/context/BuySellContext';
import PortfolioWatchlist from 'src/widgets/PortfolioWatchlist';
import Reports from 'src/widgets/Reports';
import SymbolDetail from 'src/widgets/SymbolDetail';

const Home = () => {
    const appDispatch = useAppDispatch();
    const { space } = useWorkflowState();
    useEffect(() => {
        return () => {
            appDispatch(setSelectedCustomers([]));
        };
    }, []);

//     const Components = {
//         PortfolioWatchlist: () => <PortfolioWatchlist />,
//         BuySellWidget: () => <BuySellWidget />,
//         Reports: () => <Reports />,
//         SymbolDetail: () => <SymbolDetail />,
//     };
// 
//     const getComponents = (name: IWorkFlowType) => {
//         return Components[name]();
//     };

    const Layouts = {
        PortfolioWatchlist: () => (
            <div className="col-span-9 grid-rows-1">
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
        ),
        BuySellWidget: () => (
            <div className="col-span-3 grid-rows-1 grid   h-full  ">
                <SymbolDetail />
            </div>
        ),
        Reports: () => <></>,
        SymbolDetail: () => <></>,
    };
    return (
        <div className="grid gap-2 grid-cols-12 grid-rows-1 ">
            <>{Layouts[space[0]]()}</>
            <>{Layouts[space[1]]()}</>
        </div>
    );
};

export default Home;
