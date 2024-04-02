import AppModal from 'src/common/components/AppModal';
import { TAgreements } from '.';

type Props = {
    isOpen: boolean;
    data: Partial<TAgreements>;
    handleClose: () => void;
};

const DescriptionModal = ({ data, isOpen, handleClose }: Props) => {
    return (
        <AppModal isOpen={isOpen} handleClose={handleClose} height={450} width={500} title={data?.title || '-'}>
            <div className="h-full px-5 my-5 overflow-auto">
                <p className="leading-7 text-xs text-justify dark:text-D-primary-50 whitespace-pre-line">
                    {data.description?.replace(/\\n/g, '\n') || ''}
                </p>
            </div>
        </AppModal>
    );
};

export default DescriptionModal;
