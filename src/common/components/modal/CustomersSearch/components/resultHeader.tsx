import CheckboxButton from '@uiKit/CheckboxButton';
import { FC, useEffect, useState } from 'react';

interface IResultItemProps {
     onALLSelectionChanged?: (checked: boolean) => void;
     isAllSelected?: boolean;
}

const ResultHeader: FC<IResultItemProps> = ({ onALLSelectionChanged, isAllSelected }) => {
     const [checked, setChecked] = useState(isAllSelected ? isAllSelected : false);

     useEffect(() => {
          setChecked(isAllSelected ? isAllSelected : false);
     }, [isAllSelected]);

     return (
          <div className="flex rounded-lg bg-table-header text-sm text-content-paragraph">
               <div className="flex w-full items-center justify-start border-l border-back-surface py-4 pr-3">
                    <CheckboxButton
                         checked={checked}
                         onChange={() => {
                              onALLSelectionChanged && onALLSelectionChanged(!checked);
                              setChecked(!checked);
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
               <div className="flex w-4/6 items-center justify-center border-l border-back-surface py-4">کد بورسی</div>
               <div className="flex w-4/6 items-center justify-center border-l border-back-surface py-4">کدملی</div>
               <div className="flex w-4/6 items-center justify-center border-l border-back-surface py-4">قدرت خرید سهام</div>
               <div className="flex w-4/6 items-center justify-center border-l border-back-surface py-4">اعتبار</div>
          </div>
     );
};

export default ResultHeader;
