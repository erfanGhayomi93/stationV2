import Tippy from '@tippyjs/react';
import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { CopyIcon, DeleteIcon, EditIcon, InfoFillIcon, SendIcon } from 'src/common/icons';
import ConfirmationModal from '../ConfirmModal/ConfirmationModal';
import { IProps, TButtons } from './agActionCell.t';

const AGActionCell: FC<IProps> = ({
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
    leftNode,
    rightNode
}) => {
    //
    // const {
    //    
    // } = props;

    // const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(isConfirmModalOpenParent ?? false);

    // const handleSetIsConfirm = (flag: boolean) => {
    //     if(setIsConfirmModalOpen){
    //         setIsConfirmModalOpen(flag)
    //         return;
    //     }
    //     setIsConfirmModalOpen
    // }

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
            onClick: () => onDeleteClick && onDeleteClick(data),
            Icon: DeleteIcon,
            title: 'حذف',
            styles: deleteStyle,
            classes: `${hideDelete ? 'hidden' : ''} ${deleteClass}`,
        },
    ];

    const requestedButtons = allButtons.filter(({ buttonType }) => requiredButtons.includes(buttonType));


    return (
        <div className="flex items-center justify-center gap-3 py-2 h-full">
            {rightNode && rightNode}
            {requestedButtons.map((button, index) => {
                const { Icon, onClick, title, disabled, classes, styles } = button;
                return (
                    <React.Fragment key={index}>
                        <Tippy content={title} className="text-xs">
                            <button
                                disabled={disabled}
                                className={`text-L-gray-600 disabled:text-L-gray-400 dark:text-D-gray-600 disabled:dark:text-D-gray-400 disabled:cursor-not-allowed ${classes}`}
                                style={styles}
                                ref={(ref) => {
                                    if (!ref) return;
                                    ref.onclick = (e) => {
                                        e.stopPropagation(); // this works
                                        onClick()
                                        // put your logic here instead because e.stopPropagation() will
                                        // stop React's synthetic event
                                    }
                                }}
                            >
                                <Icon />
                            </button>
                        </Tippy>
                    </React.Fragment>
                );
            })}
            {leftNode && leftNode}

        </div>
    );
};

export default memo(AGActionCell);
