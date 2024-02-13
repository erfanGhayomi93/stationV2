import { ICellRendererParams } from 'ag-grid-community';
import React, { useState } from 'react';
import { Check, DeleteIcon, EditIcon2, PlusIcon, SendIcon } from 'src/common/icons';

type Props = {};
interface TBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    size?: number;
}

const ActionCol = (props: ICellRendererParams) => {
    const [confirmType, setConfirmType] = useState<'Edit' | 'Delete' | undefined>();

    const handleCancel = () => setConfirmType(undefined);

    return (
        <div className="flex justify-center items-center gap-2 py-3 h-full">
            {confirmType ? (
                <>
                    <CustomeBtn
                        Icon={Check}
                        className="flex justify-center items-center bg-L-gray-300 rounded-3xl w-7 h-7 text-L-success-300"
                        onClick={handleCancel}
                        size={13}
                    />
                    <CustomeBtn
                        className="rotate-45 flex justify-center items-center bg-L-gray-300 rounded-3xl w-7 h-7 text-L-error-200"
                        Icon={PlusIcon}
                        onClick={handleCancel}
                        size={20}
                    />
                </>
            ) : (
                <>
                    <CustomeBtn Icon={SendIcon} />
                    <CustomeBtn Icon={EditIcon2} onClick={() => setConfirmType('Edit')} />
                    <CustomeBtn Icon={DeleteIcon} onClick={() => setConfirmType('Delete')} />
                </>
            )}
        </div>
    );
};

const CustomeBtn = ({ Icon, size = 16, ...rest }: TBtnProps) => {
    return (
        <button className="flex justify-center items-center bg-L-gray-300 rounded-3xl w-7 h-7 text-L-gray-600" {...rest}>
            <Icon height={size} width={size} />
        </button>
    );
};

export default ActionCol;
