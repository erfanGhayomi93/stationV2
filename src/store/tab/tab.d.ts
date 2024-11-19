type TCustomersManageTab = 'customers' | 'customerGroup' | 'myGroups';
type TPortfolioCustomerTab = 'portfolio' | 'positions';

interface ITabSlice {
     customersManageTab: TCustomersManageTab;
     setCustomersManageTab: (state: TCustomersManageTab) => void;

     portfolioCustomerTab: TPortfolioCustomerTab;
     setPortfolioCustomerTab: (state: TPortfolioCustomerTab) => void;
}
