import { IHeaderParams } from 'ag-grid-community';
import { Dispatch, SetStateAction, useState } from 'react';
import { EditIcon2 } from 'src/common/icons';
import HeaderInput from './HeaderInput';
import { validNumber } from 'src/utils/helpers';
import { IData } from '../../..';
import Tippy from '@tippyjs/react';

interface IProps extends IHeaderParams {
    dataSetter: Dispatch<SetStateAction<IData[]>>;
    tooltipContent: string;
}

const HeaderEditors = ({ displayName, dataSetter, column, tooltipContent }: IProps) => {
    const [isInputActive, setIsInputActive] = useState(false);
    const [fieldValue, setFieldValue] = useState<number>();

    const handleFinish = () => {
        const field = column.getColId();
        if (field) {
            dataSetter((prev) => prev.map((item) => ({ ...item, [field]: fieldValue })));
        }
    };

    return (
        <>
            {isInputActive ? (
                <div className="w-full h-full">
                    <HeaderInput
                        value={fieldValue}
                        onBlur={() => setIsInputActive(false)}
                        onClear={() => setFieldValue(undefined)}
                        onChange={(e) => setFieldValue(validNumber(e.target.value))}
                        onFinish={handleFinish}
                    />
                </div>
            ) : (
                <Tippy content={`ویرایش گروهی ${tooltipContent}`}>
                    <div className="font-normal flex justify-center gap-1 w-full" onClick={() => setIsInputActive(true)}>
                        {displayName}
                        <EditIcon2 height={16} width={16} />
                    </div>
                </Tippy>
            )}
        </>
    );
};

export default HeaderEditors;
