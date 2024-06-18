import { FC } from "react";


interface IResultItemProps {
    onALLSelectionChanged?: (checked: boolean) => void;
    isAllSelected?: boolean;
}

const ResultHeader: FC<IResultItemProps> = ({ onALLSelectionChanged, isAllSelected }) => {

    return (
        <div className="flex h-10 bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg font-semibold">
            <div className="w-full flex items-center justify-start border-l border-L-basic dark:border-D-basic pr-3">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={isAllSelected}
                    onChange={(event) => onALLSelectionChanged && onALLSelectionChanged(event.target.checked)}
                />

                <span className="pr-12 text-L-gray-500 dark:text-D-gray-700">نام</span>
            </div>
            <div className="w-4/6 flex items-center justify-center text-L-gray-500 dark:text-D-gray-700 border-l border-L-basic dark:border-D-basic">
                کد بورسی
            </div>
            <div className="w-4/6 flex items-center justify-center text-L-gray-500 dark:text-D-gray-700 border-l border-L-basic dark:border-D-basic">
                کدملی
            </div>
            <div className="w-4/6 flex items-center justify-center text-L-gray-500 dark:text-D-gray-700 border-l border-L-basic dark:border-D-basic">
                قدرت خرید
            </div>
            <div className="w-4/6 flex items-center justify-center text-L-gray-500 dark:text-D-gray-700 border-l border-L-basic dark:border-D-basic">
                اعتبار
            </div>
            <div className="w-4/6 flex items-center justify-center text-L-gray-500 dark:text-D-gray-700">عملیات</div>
        </div>
    );
};

export default ResultHeader;
