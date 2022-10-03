import { DeleteIcon, EditIcon, SendIcon } from 'src/common/icons';

function ActionCell() {
    return (
        <div className="flex items-center justify-center gap-2 py-2 h-full">
            <button className="dark:bg-D-gray-250 bg-L-gray-250 px-1.5 py-1.5 rounded-md">
                <SendIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
            <button className="dark:bg-D-gray-250 bg-L-gray-250 px-1.5 py-1.5 rounded-md">
                <EditIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
            <button className="dark:bg-D-gray-250 bg-L-gray-250 px-1.5 py-1.5 rounded-md">
                <DeleteIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
        </div>
    );
}

export default ActionCell;
