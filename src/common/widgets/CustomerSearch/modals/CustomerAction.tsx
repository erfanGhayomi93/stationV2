import Modal from 'src/common/components/Modal';
import { useCustomerSearchState } from '../context/CustomerSearchContext';

type ICustomerActionType = {};

const CustomerAction = ({}: ICustomerActionType) => {
    const { setState, state } = useCustomerSearchState();

    const closeModal = () => {
        setState((prev) => ({ ...prev, actionModalData: undefined }));
    };

    return (
        <>
            <Modal isOpen={!!state.actionModalData} onClose={closeModal}>
                <>{state.actionModalData?.customerTitle}</>
            </Modal>
        </>
    );
};

export default CustomerAction;
