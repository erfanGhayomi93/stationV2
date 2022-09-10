import React from 'react';
import Modal from 'src/common/components/Modal';
import { useCustomerSearchState } from '../context/CustomerSearchContext';

type ICustomerDetailType = {};

const CustomerDetail = ({}: ICustomerDetailType) => {
    const { setState, state } = useCustomerSearchState();

    const closeModal = () => {
        setState((prev) => ({ ...prev, detailModalData: undefined }));
    };
    return (
        <>
            <Modal isOpen={!!state.detailModalData} onClose={closeModal}>
                <>{state.detailModalData?.customerTitle}</>
            </Modal>
        </>
    );
};

export default CustomerDetail;
