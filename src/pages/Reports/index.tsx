import { Navigate, useParams } from 'react-router-dom';

import TurnOver from './TurnOver';
import Trades from './Trades';
import Orders from './Orders';

const Reports = () => {
    //
    const { activeTab } = useParams();
    if (activeTab === 'orders') return <Orders />;
    if (activeTab === 'trades') return <Trades />;
    if (activeTab === 'turnover') return <TurnOver />;
    return <Navigate to={'/Reports/orders'} />;
};

export default Reports;
