import { ICellRendererParams } from 'ag-grid-community';
// import { EditIcon2 } from 'src/common/icons';
import './style.scss';
import Tippy from '@tippyjs/react';

interface IProps extends ICellRendererParams {
    tooltipContent: string;
}

const EditableColumn = ({ valueFormatted, tooltipContent }: IProps) => {
    return (
        <Tippy content={`ویرایش ${tooltipContent}`}>
            <div className="h-full w-full flex items-center justify-center gap-1 editableCol cursor-pointer">
                {valueFormatted} 
                {/* <EditIcon2 className="icon" height={16} width={16} /> */}
            </div>
        </Tippy>
    );
};

export default EditableColumn;
