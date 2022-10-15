import { DeleteIcon, EditIcon, SendIcon } from 'src/common/icons';


export enum TypeActionEnum {
    SEND = 'SEND,',
    EDIT = 'EDIT,',
    DELETE = 'DELETE,',
}

type IActionCell<T> = {
    type: string[];
    data: T;
    handleDelete?: (data: T) => void;
    handleEdit?: (data: T) => void;
    handleSend?: (data: T) => void;
};

function ActionCell({ type, data, handleDelete, handleEdit, handleSend }: IActionCell<IOrderSelected & IDraftSelected>) {
    const isSend = type.includes(TypeActionEnum.SEND);
    const isEdit = type.includes(TypeActionEnum.EDIT);
    const isDelete = type.includes(TypeActionEnum.DELETE);

    return (
        <div className="flex items-center justify-center gap-2 py-2 h-full">
            <button
                data-actived={isSend}
                className="hidden actived:inline-block dark:bg-D-gray-250 bg-L-gray-250 px-1.5 py-1.5 rounded-md"
                onClick={() => handleSend && handleSend(data)}
            >
                <SendIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
            <button
                data-actived={isEdit}
                className="hidden actived:inline-block dark:bg-D-gray-250 bg-L-gray-250 px-1.5 py-1.5 rounded-md"
                onClick={() => handleEdit && handleEdit(data)}
            >
                <EditIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
            <button
                data-actived={isDelete}
                className="hidden actived:inline-block dark:bg-D-gray-250 bg-L-gray-250 px-1.5 py-1.5 rounded-md"
                onClick={() => handleDelete && handleDelete(data)}
            >
                <DeleteIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
        </div>
    );
}

export default ActionCell;
