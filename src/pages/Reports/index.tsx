import { Navigate, useParams } from 'react-router-dom';
import OrdersPage from './Orders/Context/OrdersContext';
import TradesPage from './Trades/context/TradesContext';

const Reports = () => {
    //
    const { activeTab } = useParams();
    if (activeTab === 'orders') return <OrdersPage />;
    if (activeTab === 'trades') return <TradesPage />;
    if (activeTab === 'turnover') return <div>turnover</div>;
    return <Navigate to={'/Reports/orders'} />;
};

export default Reports;
