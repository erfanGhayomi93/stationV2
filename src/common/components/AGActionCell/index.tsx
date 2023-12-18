import Tippy from '@tippyjs/react';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import { CopyIcon, DeleteIcon, EditIcon, SendIcon } from 'src/common/icons';

type TButtonTypes = 'Send' | 'Edit' | 'Copy' | 'Delete';

type TButtons = {
    buttonType: TButtonTypes;
    disabled?: boolean;
    onClick: () => void;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    hide: boolean;
}[];

interface IProps extends Partial<ICellRendererParams> {
    requiredButtons: TButtonTypes[];
    disableSend?: boolean;
    disableEdit?: boolean;
    disableCopy?: boolean;
    disableDelete?: boolean;
    onSendClick?: (data: ICellRendererParams['data']) => void;
    onEditClick?: (data: ICellRendererParams['data']) => void;
    onCopyClick?: (data: ICellRendererParams['data']) => void;
    onDeleteClick?: (data: ICellRendererParams['data']) => void;
}

const AGActionCell = ({
    data,
    requiredButtons,
    disableCopy,
    disableDelete,
    disableEdit,
    disableSend,
    onCopyClick,
    onDeleteClick,
    onEditClick,
    onSendClick,
}: IProps) => {
    //
    const allButtons: TButtons = [
        {
            buttonType: 'Send',
            disabled: disableSend,
            onClick: () => onSendClick && onSendClick(data),
            Icon: SendIcon,
            title: 'ارسال',
            hide: false,
        },
        {
            buttonType: 'Edit',
            disabled: disableEdit,
            onClick: () => onEditClick && onEditClick(data),
            Icon: EditIcon,
            title: 'ویرایش',
            hide: false,
        },
        {
            buttonType: 'Copy',
            disabled: disableCopy,
            onClick: () => onCopyClick && onCopyClick(data),
            Icon: CopyIcon,
            title: 'کپی',
            hide: false,
        },
        {
            buttonType: 'Delete',
            disabled: disableDelete,
            onClick: () => onDeleteClick && onDeleteClick(data),
            Icon: DeleteIcon,
            title: 'حذف',
            hide: false,
        },
    ];

    const requestedButtons = allButtons.filter(({ buttonType }) => requiredButtons.includes(buttonType));

    return (
        <div className="flex items-center justify-center gap-4 py-2 h-full">
            {requestedButtons.map((button, index) => {
                const { Icon, onClick, hide, title, disabled } = button;
                return (
                    <React.Fragment key={index}>
                        {!hide && (
                            <Tippy content={title} className="text-xs">
                                <button data-actived={!disabled} className="hidden actived:inline-block" onClick={onClick}>
                                    <Icon className="text-L-gray-600 dark:text-D-gray-600" />
                                </button>
                            </Tippy>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default AGActionCell;
