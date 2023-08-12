import Tippy from '@tippyjs/react';
import { CopyIcon, DeleteIcon, EditIcon, SendIcon } from 'src/common/icons';

export enum TypeActionEnum {
    SEND = 'SEND',
    EDIT = 'EDIT',
    DELETE = 'DELETE',
    COPY = 'COPY',
}

type IActionCell<T> = {
    type: string[];
    data: T | undefined;
    handleDelete?: (data: T | undefined) => void;
    handleCopy?: (data: T | undefined) => void;
    handleEdit?: (data: T | undefined) => void;
    handleSend?: (data: T | undefined) => void;
};

function ActionCell<T>({ type, data, handleDelete, handleEdit, handleSend, handleCopy }: IActionCell<T>) {
    const isSend = type.includes(TypeActionEnum.SEND);
    const isEdit = type.includes(TypeActionEnum.EDIT);
    const isDelete = type.includes(TypeActionEnum.DELETE);
    const isCopy = type.includes(TypeActionEnum.COPY);

    const buttons = [
        {
            isActived: isSend,
            onClick: handleSend,
            Icon: SendIcon,
            title: 'ارسال',
        },
        {
            isActived: isEdit,
            onClick: handleEdit,
            Icon: EditIcon,
            title: 'ویرایش',
        },
        {
            isActived: isCopy,
            onClick: handleCopy,
            Icon: CopyIcon,
            title: 'کپی',
        },
        {
            isActived: isDelete,
            onClick: handleDelete,
            Icon: DeleteIcon,
            title: 'حذف',
        },
    ];

    return (
        <div className="flex items-center justify-center gap-4 py-2 h-full">
            {buttons.map((item, ind) => {
                const { Icon, isActived, onClick, title } = item;
                return (
                    <>
                        {isActived && (
                            <Tippy content={title} className="text-xs">
                                <button
                                    key={ind}
                                    data-actived={isActived}
                                    className="hidden actived:inline-block"
                                    onClick={() => onClick && onClick(data)}
                                >
                                    <Icon className="text-L-gray-600 dark:text-D-gray-600" />
                                </button>
                            </Tippy>
                        )}
                    </>
                );
            })}
        </div>
    );
}

export default ActionCell;
