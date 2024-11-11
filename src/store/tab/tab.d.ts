type TCustomersManageTab = 'customers' | 'customerGroup' | 'myGroups';

interface ITabSlice {
     customersManageTab: TCustomersManageTab;
     setCustomersManageTab: (state: TCustomersManageTab) => void;
}
