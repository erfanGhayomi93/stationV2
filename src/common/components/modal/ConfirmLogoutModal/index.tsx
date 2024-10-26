import { useLogout } from '@api/oAuth';
import { useModalStore } from '@store/modal';
import Button from '@uiKit/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { routerPagePath } from 'router/routerPage';
import Modal from '..';

const ConfirmLogoutModal = () => {
     const { t } = useTranslation();

     const navigate = useNavigate();

     const { setConfirmLogoutModal } = useModalStore();

     const { mutate } = useLogout();

     const onCloseModal = () => {
          setConfirmLogoutModal(false);
     };

     const onConfirmLogout = () => {
          toast.success(t('alerts.logout_successful'));
          onCloseModal();

          mutate();

          navigate(routerPagePath.oAuth.logout);
     };

     return (
          <Modal title={<span>{t('confirmLogoutModal.logoutAccount')}</span>} onCloseModal={onCloseModal} size="xs">
               <div className="flex flex-col gap-8">
                    <span>{t('confirmLogoutModal.logoutAccountConfirm')}</span>

                    <div className="flex items-center gap-2">
                         <Button onClick={onCloseModal} className="basis-4/12 py-3" variant="danger-outline">
                              {t('confirmLogoutModal.cancel')}
                         </Button>
                         <Button onClick={onConfirmLogout} className="flex-1 py-3" variant="danger">
                              {t('confirmLogoutModal.logout')}
                         </Button>
                    </div>
               </div>
          </Modal>
     );
};

export default ConfirmLogoutModal;
