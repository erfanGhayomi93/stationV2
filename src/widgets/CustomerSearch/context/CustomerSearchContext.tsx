import { useState } from 'react';
import { createContainer } from 'react-tracked';
import CustomerSearch from '..';
import CustomerDetailModal from '../modal/CustomerDetailModal';
interface ICustomerSearchWidgetType {
    params: IGoCustomerRequest;
    detailModalData?: IGoMultiCustomerType;
    isSelectedActive?: boolean;
}
const useValue = () => useState<ICustomerSearchWidgetType>({ params: {} });

export const { Provider: CustomerSearchProvider, useTrackedState, useUpdate: useSetState } = createContainer(useValue);
export const useCustomerSearchState = () => {
    const setState = useSetState();
    const state = useTrackedState();
    return { state, setState };
};
const CustomerSearchWidget = () => {
    return (
        <>
            <CustomerSearch />
            <CustomerDetailModal />
        </>
    );
};

export default CustomerSearchWidget;
