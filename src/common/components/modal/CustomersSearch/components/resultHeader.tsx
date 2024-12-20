import CheckboxButton from "@uiKit/CheckboxButton";
import { FC, useEffect, useState } from "react";


interface IResultItemProps {
    onALLSelectionChanged?: (checked: boolean) => void;
    isAllSelected?: boolean;
}

const ResultHeader: FC<IResultItemProps> = ({ onALLSelectionChanged, isAllSelected }) => {

    const [checked, setChecked] = useState(isAllSelected ? isAllSelected : false)

    useEffect(() => {
        setChecked(isAllSelected ? isAllSelected : false)
    }, [isAllSelected])



    return (
        <div className="flex bg-table-header text-content-paragraph text-sm rounded-lg">
            <div className="w-full flex items-center justify-start border-l py-4 border-back-surface pr-3">

                <CheckboxButton
                    checked={checked}
                    onChange={() => {
                        onALLSelectionChanged && onALLSelectionChanged(!checked)
                        setChecked(!checked)
                    }}
                />

                {/* <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={isAllSelected}
                    onChange={(event) => onALLSelectionChanged && onALLSelectionChanged(event.target.checked)}
                />  */}

                <span className="pr-12">نام</span>
            </div>
            <div className="w-4/6 flex items-center justify-center border-l py-4 border-back-surface">
                کد بورسی
            </div>
            <div className="w-4/6 flex items-center justify-center border-l py-4 border-back-surface">
                کدملی
            </div>
            <div className="w-4/6 flex items-center justify-center border-l py-4 border-back-surface">
                قدرت خرید
            </div>
            <div className="w-4/6 flex items-center justify-center border-l py-4 border-back-surface">
                اعتبار
            </div>
        </div>
    );
};

export default ResultHeader;
