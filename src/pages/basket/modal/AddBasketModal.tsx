import Modal from 'src/common/components/Modal';
import { CloseIcon } from 'src/common/icons';
import CreateBasket from '../components/CreateBasket';
import { useTranslation } from 'react-i18next';

interface IAddBasketType {
    showAddForm: boolean;
    toggleAddBasket: () => void;
}

const AddBasketModal = ({ showAddForm, toggleAddBasket }: IAddBasketType) => {
    
    const { t } = useTranslation();

    return (
        <Modal isOpen={showAddForm} onClose={toggleAddBasket} className="w-[500px] rounded-md h-full grid">
            <div className="grid grid-rows-min-one bg-L-basic dark:bg-D-basic">
                <div className="w-full text-white font-medium  bg-L-blue-200 dark:bg-D-blue-200 h-10 flex items-center justify-between px-5">
                    <p>{t('Basket.addNewBasket')}</p>
                    <CloseIcon data-cy="basket-create-cancel" onClick={toggleAddBasket} className="cursor-pointer" />
                </div>
                <div className="p-4">
                    <CreateBasket toggleAddBasket={toggleAddBasket} />
                </div>
            </div>
        </Modal>
    );
};

export default AddBasketModal;
