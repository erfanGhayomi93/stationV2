import Modal from 'src/common/components/Modal';
import { CloseIcon } from 'src/common/icons';
import CustomerDetail from '../../components/CustomerDetail';
import GroupDetail from '../../components/GroupDetail/GroupDetail';

import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import { useTranslation } from 'react-i18next';

type ICustomerDetailModalType = {};

const CustomerDetailModal = ({}: ICustomerDetailModalType) => {
    //
    const { t } = useTranslation();
    const { setState, state } = useCustomerSearchState();
    const closeModal = () => {
        setState((prev) => ({ ...prev, isDetailModalOpen: false, detailModalData: undefined }));
    };
    return (
        <>
            <Modal isOpen={!!state.isDetailModalOpen} onClose={closeModal} className="min-h-[40rem] w-2/4 rounded-md h-full grid ">
                <div className="grid grid-rows-min-one">
                    <div className="w-full text-white font-semibold  bg-L-blue-200 dark:bg-D-blue-200 h-10 flex items-center justify-between px-5">
                        <div>{`${t('common.customerInformation')}  (${state.detailModalData?.title || ''})`}</div>
                        <CloseIcon onClick={closeModal} className="cursor-pointer" />
                    </div>
                    {/* {state.detailModalData?.customerType === 'CustomerTag' || state.detailModalData?.customerType === 'TraderGroup' ? (
                        <GroupDetail />
                    ) : (
                        <CustomerDetail />
                    )} */}
                </div>
            </Modal>
        </>
    );
};

export default CustomerDetailModal;
