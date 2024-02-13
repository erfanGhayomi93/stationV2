import { ICellRendererParams } from 'ag-grid-community';
import { EditIcon2 } from 'src/common/icons';
import './style.scss';

const EditableColumn = ({ valueFormatted }: ICellRendererParams) => {
    return (
        <div className="h-full w-full flex items-center justify-center gap-1 editableCol cursor-pointer">
            {valueFormatted} <EditIcon2 className="icon" height={16} width={16} />
        </div>
    );
};

export default EditableColumn;
