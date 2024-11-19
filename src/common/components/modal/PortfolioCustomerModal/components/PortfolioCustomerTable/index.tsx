import { useTabSlice } from '@store/tab';
import { useCallback } from 'react';
import PortfolioTable from './PortfolioTable';
import PositionsTable from './PositionsTable';

interface PortfolioCustomerTableProps {
     customer: ICustomerAdvancedSearchRes | undefined;
}

const PortfolioCustomerTable = ({ customer }: PortfolioCustomerTableProps) => {
     const { portfolioCustomerTab } = useTabSlice();

     const PortfolioCustomerTableRender = useCallback(() => {
          if (!customer) return;
          const tableComponents = {
               portfolio: <PortfolioTable customer={customer} />,
               positions: <PositionsTable customer={customer} />,
          };

          return tableComponents[portfolioCustomerTab];
     }, [portfolioCustomerTab, customer]);

     return <PortfolioCustomerTableRender />;
};

export default PortfolioCustomerTable;
