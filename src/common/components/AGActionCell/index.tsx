import Tippy from '@tippyjs/react';
import React, { useState } from 'react';
import { CopyIcon, DeleteIcon, EditIcon, InfoFillIcon, SendIcon } from 'src/common/icons';
import ConfirmationModal from '../ConfirmModal/ConfirmationModal';
import { IProps, TButtons } from './agActionCell.t';

const AGActionCell = (props: IProps) => {
    //
    const {
        data,
        requiredButtons,
        disableInfo,
        disableCopy,
        disableDelete,
        disableEdit,
        disableSend,
        onInfoClick,
        onCopyClick,
        onDeleteClick,
        onEditClick,
        onSendClick,
        infoStyle = {},
        sendStyle = {},
        editStyle = {},
        copyStyle = {},
        deleteStyle = {},
        infoClass = '',
        sendClass = '',
        editClass = '',
        copyClass = '',
        deleteClass = '',
        hideCopy = false,
        hideDelete = false,
        hideEdit = false,
        hideSend = false,
        hideInfo = false,
        deleteModalTitle = 'حذف',
        deleteModalDescription = 'آیا از حذف رکورد اطمینان دارید؟',
    } = props;

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const allButtons: TButtons = [
        {
            buttonType: 'Info',
            disabled: disableInfo,
            onClick: () => onInfoClick && onInfoClick(data),
            Icon: InfoFillIcon,
            title: 'جزئیات',
            styles: infoStyle,
            classes: `${hideInfo ? 'hidden' : ''} ${infoClass}`,
        },
        {
            buttonType: 'Send',
            disabled: disableSend,
            onClick: () => onSendClick && onSendClick(data),
            Icon: SendIcon,
            title: 'ارسال',
            styles: sendStyle,
            classes: `${hideSend ? 'hidden' : ''} ${sendClass}`,
        },
        {
            buttonType: 'Edit',
            disabled: disableEdit,
            onClick: () => onEditClick && onEditClick(data),
            Icon: EditIcon,
            title: 'ویرایش',
            styles: editStyle,
            classes: `${hideEdit ? 'hidden' : ''} ${editClass}`,
        },
        {
            buttonType: 'Copy',
            disabled: disableCopy,
            onClick: () => onCopyClick && onCopyClick(data),
            Icon: CopyIcon,
            title: 'کپی',
            styles: copyStyle,
            classes: `${hideCopy ? 'hidden' : ''} ${copyClass}`,
        },
        {
            buttonType: 'Delete',
            disabled: disableDelete,
            onClick: () => setIsConfirmModalOpen(true),
            Icon: DeleteIcon,
            title: 'حذف',
            styles: deleteStyle,
            classes: `${hideDelete ? 'hidden' : ''} ${deleteClass}`,
        },
    ];

    const requestedButtons = allButtons.filter(({ buttonType }) => requiredButtons.includes(buttonType));

    const handleConfirm = () => {
        if (onDeleteClick) {
            onDeleteClick(data);
            setIsConfirmModalOpen(false);
        }
    };

    return (
        <div className="flex items-center justify-center gap-3 py-2 h-full">
            {requestedButtons.map((button, index) => {
                const { Icon, onClick, title, disabled, classes, styles } = button;
                return (
                    <React.Fragment key={index}>
                        <Tippy content={title} className="text-xs">
                            <button
                                disabled={disabled}
                                className={`text-L-gray-600 disabled:text-L-gray-400 dark:text-D-gray-600 disabled:dark:text-D-gray-400 disabled:cursor-not-allowed ${classes}`}
                                style={styles}
                                onClick={onClick}
                            >
                                <Icon />
                            </button>
                        </Tippy>
                    </React.Fragment>
                );
            })}
            {isConfirmModalOpen && (
                <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    setIsOpen={setIsConfirmModalOpen}
                    title={deleteModalTitle}
                    description={deleteModalDescription}
                    onConfirm={handleConfirm}
                    onCancel={() => setIsConfirmModalOpen(false)}
                    confirmBtnLabel="تایید"
                />
            )}
        </div>
    );
};

export default AGActionCell;
