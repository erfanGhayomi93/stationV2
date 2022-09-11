import Modal from 'src/common/components/Modal';
import { CloseIcon } from 'src/common/icons';
import CustomerDetail from '../../components/CustomerDetail/CustomerDetail';
import GroupDetail from '../../components/GroupDetail/GroupDetail';

import { useCustomerSearchState } from '../../context/CustomerSearchContext';

type ICustomerDetailModalType = {};

const CustomerDetailModal = ({}: ICustomerDetailModalType) => {
    const { setState, state } = useCustomerSearchState();
    const closeModal = () => {
        setState((prev) => ({ ...prev, detailModalData: undefined }));
    };
    return (
        <>
            <Modal isOpen={!!state.detailModalData} onClose={closeModal} className="min-h-[40rem] w-2/4 rounded-md h-full grid ">
                <div className="grid grid-rows-min-one">
                    <div className="w-full text-white font-semibold  bg-[#135CA4] h-10 flex items-center justify-between px-5">
                        <div>{state.detailModalData?.customerTitle}</div>
                        <CloseIcon onClick={closeModal} className="cursor-pointer" />
                    </div>
                    {state.detailModalData?.customerISIN ? <CustomerDetail /> : <GroupDetail />}
                </div>
            </Modal>
        </>
    );
};

export default CustomerDetailModal;
