import { CloseIcon } from 'src/common/icons';
import Modal from '../Modal';
import { Dispatch, SetStateAction } from 'react';

type TProps = {
    width?: number;
    height?: number;
    isOpen: boolean;
    className?: string;
    titleClassName?: string;
    title?: string | React.ReactNode;
    children: React.ReactNode;
    handleClose?: () => void;
};

const AppModal = ({
    width = 500,
    height = 300,
    className = '',
    title = '',
    titleClassName = '',
    children,
    isOpen,
    handleClose = () => {},
}: TProps) => {
    //

    return (
        <Modal isOpen={isOpen} onClose={handleClose} className={`rounded ${className}`} style={{ height, width }}>
            <div className="w-full h-full bg-L-basic dark:bg-D-basic flex flex-col">
                <div className={`flex justify-between items-center bg-L-blue-200 dark:bg-D-primary-200 px-6 h-12 ${titleClassName}`}>
                    <span className="font-medium text-base text-white">{title}</span>
                    <button className="p-1" onClick={handleClose}>
                        <CloseIcon className="text-white" />
                    </button>
                </div>
                {children}
            </div>
        </Modal>
    );
};

export default AppModal;
