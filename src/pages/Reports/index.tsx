import { Navigate, useParams } from 'react-router-dom';
import OrdersPage from './Orders/Context/OrdersContext';
import TradesPage from './Trades/context/TradesContext';
import TurnOver from './TurnOver';

const Reports = () => {
    //
    const { activeTab } = useParams();
    // if (activeTab === 'orders') return <OrdersPage />;
    if (activeTab === 'orders') return <h1>سفارشات</h1>;
    if (activeTab === 'trades') return <TradesPage />;
    if (activeTab === 'turnover') return <TurnOver />;
    return <Navigate to={'/Reports/orders'} />;
};

export default Reports;
