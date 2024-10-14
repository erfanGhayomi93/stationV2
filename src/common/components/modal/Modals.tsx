import { isObjectNotNull } from '@methods/helper';
import { useModalStore } from 'store/modal';
import EditOrdersGroupModal from './EditOrdersGroupModal';

const Modals = () => {
     const { editOrdersGroupModalSheet } = useModalStore();

     console.log(editOrdersGroupModalSheet, 'editOrdersGroupModalSheet');

     return <>{isObjectNotNull(editOrdersGroupModalSheet) && <EditOrdersGroupModal />}</>;
};

export default Modals;
