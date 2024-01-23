import React from 'react';
import { useTranslation } from 'react-i18next';
import AppModal from '../AppModal';

type ConfirmModalProps = {
    title: string | React.ReactElement;
    description: string | React.ReactElement;
    confirmBtnLabel?: string;
    cancelBtnLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
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
}: ConfirmModalProps) => {
    //
    const { t } = useTranslation();

    return (
        <AppModal width={400} isOpen={isOpen} handleClose={onCancel} title={title}>
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
        </AppModal>
    );
};

export default ConfirmationModal;
