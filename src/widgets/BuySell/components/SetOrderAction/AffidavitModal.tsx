import AppModal from 'src/common/components/AppModal';
import Button from 'src/common/components/Buttons/Button';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    onSubmit: () => void;
    title?: string;
    description?: string;
};

const AffidavitModal = ({ handleClose, isOpen, onSubmit, title, description }: Props) => {
    return (
        <AppModal isOpen={isOpen} handleClose={handleClose} title={title || '-'} height={500}>
            <div className="flex flex-col justify-between h-full">
                <p className="whitespace-pre-line text-xs leading-7 text-justify dark:text-D-primary-50 py-4 px-5">{description || '-'}</p>
                <div className="ltr p-4">
                    <Button variant="success" onClick={onSubmit}>
                        <span className="p-4">{'تایید میکنم'}</span>
                    </Button>
                </div>
            </div>
        </AppModal>
    );
};

export default AffidavitModal;
