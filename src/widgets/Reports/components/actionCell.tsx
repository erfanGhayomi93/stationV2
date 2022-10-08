import { DeleteIcon, EditIcon, SendIcon } from 'src/common/icons';

export enum TypeActionEnum {
    DRAFt = 'Draft',
    OPEN_ORDER = 'OPEN_ORDER',
    DONE_ORDER = 'DONE_ORDER',
    FAILED_ORDER = 'FAILED_ORDER',
}
type IActionCell<T> = {
    type: TypeActionEnum;
    data: T;
    handleDelete?: (data: T) => void;
    handleEdit?: (data: T) => void;
};

function ActionCell({ type, data, handleDelete, handleEdit }: IActionCell<IOrderSelected & IDraftSelected>) {
    // const handleDelete = () => {
    //     if (type === TypeActionEnum.DRAFt) {
    //         handleDelete && handleDelete(id)
    //     }
    // };
    return (
        <div className="flex items-center justify-center gap-2 py-2 h-full">
            <button className="dark:bg-D-gray-250 bg-L-gray-250 px-1.5 py-1.5 rounded-md">
                <SendIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
            <button className="dark:bg-D-gray-250 bg-L-gray-250 px-1.5 py-1.5 rounded-md" onClick={() => handleEdit && handleEdit(data)}>
                <EditIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
            {/* {type === TypeActionEnum.DRAFt && ( */}
            <button className="dark:bg-D-gray-250 bg-L-gray-250 px-1.5 py-1.5 rounded-md" onClick={() => handleDelete && handleDelete(data)}>
                <DeleteIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
            {/* )} */}
        </div>
    );
}

export default ActionCell;
