import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from 'src/common/icons';
import Modal from '../Modal';

type ConfirmModalProps = {
    title: string | React.ReactElement;
    description: string | React.ReactElement;
    confirmBtnLabel?: string;
    cancelBtnLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
    setIsOpen: any;
    classes?: Partial<Record<'root' | 'confirmBtn' | 'cancelBtn', ClassesValue>>;
};

const ConfirmationModal = ({
    title,
    description,
    confirmBtnLabel = 'common.confirm',
    cancelBtnLabel = 'common.cancel',
    onConfirm,
    onCancel,
    isOpen,
    setIsOpen,
}: ConfirmModalProps) => {
    //
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={setIsOpen} className="rounded">
            <div className="w-96 bg-L-basic dark:bg-D-basic flex flex-col shadow-md rounded overflow-hidden">
                <div className="moveable flex justify-between items-center bg-L-primary-50 dark:bg-D-primary-200 hover:cursor-grab px-6 h-12">
                    {typeof title === 'string' ? <span className="font-medium text-base text-white">{t(title)}</span> : title}
                    <button className="p-1" onClick={onCancel}>
                        <CloseIcon className="text-white" />
                    </button>
                </div>

                <div className="flex flex-col flex-1 overflow-hidden gap-6 p-5">
                    <div className="flex">
                        <p className="text-sm text-L-gray-700 dark:text-D-gray-700">{description}</p>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onCancel}
                            className="flex items-center rounded text-xs justify-center text-L-gray-500 dark:text-D-gray-500 border border-L-gray-500 dark:border-D-gray-500 px-5 h-8"
                        >
                            {t(cancelBtnLabel)}
                        </button>

                        <button
                            type="submit"
                            onClick={onConfirm}
                            autoFocus
                            className="flex items-center rounded justify-center text-xs btn-primary px-5 h-8"
                        >
                            {t(confirmBtnLabel)}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
