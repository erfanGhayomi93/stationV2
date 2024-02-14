import { ICellRendererParams } from 'ag-grid-community';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Check, DeleteIcon, PlusIcon, SendIcon } from 'src/common/icons';
import { IData } from '../../..';

interface Props extends ICellRendererParams {
    dataSetter: Dispatch<SetStateAction<IData[]>>;
}
interface TBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    size?: number;
}

const ActionCol = ({ data, dataSetter }: Props) => {
    const [isDeleteBtnActive, setIsDeleteBtnActive] = useState(false);

    const handleCancel = () => setIsDeleteBtnActive(false);
    const handleDelete = () => dataSetter((prev) => prev.filter((item) => item.uniqId !== data?.rowNumber));

    return (
        <div className="flex justify-center items-center gap-2 py-3 h-full">
            {isDeleteBtnActive ? (
                <>
                    <CustomeBtn
                        Icon={Check}
                        className="flex justify-center items-center bg-L-gray-300 rounded-3xl w-7 h-7 text-L-success-300"
                        onClick={handleDelete}
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
                    <CustomeBtn Icon={DeleteIcon} onClick={() => setIsDeleteBtnActive(true)} />
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
