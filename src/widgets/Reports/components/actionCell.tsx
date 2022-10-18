import { CopyIcon, DeleteIcon, EditIcon, SendIcon } from 'src/common/icons';

export enum TypeActionEnum {
    SEND = 'SEND',
    EDIT = 'EDIT',
    DELETE = 'DELETE',
    COPY = 'COPY',
}

type IActionCell<T> = {
    type: string[];
    data: T;
    handleDelete?: (data: T) => void;
    handleCopy?: (data: T) => void;
    handleEdit?: (data: T) => void;
    handleSend?: (data: T) => void;
};

function ActionCell({ type, data, handleDelete, handleEdit, handleSend, handleCopy }: IActionCell<IOrderSelected & IDraftSelected>) {
    const isSend = type.includes(TypeActionEnum.SEND);
    const isEdit = type.includes(TypeActionEnum.EDIT);
    const isDelete = type.includes(TypeActionEnum.DELETE);
    const isCopy = type.includes(TypeActionEnum.COPY);

    const buttons = [
        {
            isActived: isSend,
            onClick: handleSend,
            Icon: SendIcon,
        },
        {
            isActived: isEdit,
            onClick: handleEdit,
            Icon: EditIcon,
        },
        {
            isActived: isCopy,
            onClick: handleCopy,
            Icon: CopyIcon,
        },
        {
            isActived: isDelete,
            onClick: handleDelete,
            Icon: DeleteIcon,
        },
    ];

    return (
        <div className="flex items-center justify-center gap-2 py-2 h-full">
            {buttons.map((item, ind) => {
                const { Icon, isActived, onClick } = item;
                return (
                    <button
                        key={ind}
                        data-actived={isActived}
                        className="hidden actived:inline-block dark:bg-D-gray-250 bg-L-gray-250 px-1.5 py-1.5 rounded-md"
                        onClick={() => onClick && onClick(data)}
                    >
                        <Icon className="text-L-primary-50 dark:text-D-primary-50" />
                    </button>
                );
            })}
        </div>
    );
}

export default ActionCell;
