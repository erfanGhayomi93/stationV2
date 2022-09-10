import { useState } from 'react';
import { createContainer } from 'react-tracked';
import CustomerSearch from '..';
import CustomerAction from '../modals/CustomerAction';
import CustomerDetail from '../modals/CustomerDetail';
interface ICustomerSearchWidgetType {
    params: IGoCustomerRequest;
    actionModalData?: IGoCustomerSearchResult;
    detailModalData?: IGoCustomerSearchResult;
    selectedCustomers: IGoCustomerSearchResult[];
    isSelectedActive?: boolean;
}
const useValue = () => useState<ICustomerSearchWidgetType>({ params: { type: 'Customer' }, selectedCustomers: [] });

export const { Provider: CustomerSearchProvider, useTrackedState, useUpdate: useSetState } = createContainer(useValue);
export const useCustomerSearchState = () => {
    const setState = useSetState();
    const state = useTrackedState();
    return { state, setState };
};
const CustomerSearchWidget = () => {
    return (
        <>
            <CustomerSearchProvider>
                <CustomerSearch />
                <CustomerAction />
                <CustomerDetail />
            </CustomerSearchProvider>
        </>
    );
};

export default CustomerSearchWidget;
