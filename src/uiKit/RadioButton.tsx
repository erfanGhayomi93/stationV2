import clsx from 'clsx';

type TRadioButtonType = {
     checked: boolean;
     label: string | React.ReactNode;
     onChange: () => void;
     classes?: Partial<Record<'root' | 'label', ClassesValue>>;
};
const RadioButton = ({ onChange, checked, label, classes }: TRadioButtonType) => {
     return (
          <div
               onClick={onChange}
               className={clsx(
                    'flex cursor-pointer items-center gap-2 rounded-lg p-2',
                    classes?.root,
                    checked && 'bg-back-primary-container'
               )}
               tabIndex={-1}
               role="radio"
               aria-checked={checked}
          >
               <div className="flex h-4 w-4 items-center justify-center rounded-full border border-line-div-1">
                    {checked && (
                         <div style={{ width: '12px', height: '12px' }} className="rounded-full bg-button-primary-default" />
                    )}
               </div>

               <span className={clsx(classes?.label)}>{label}</span>
          </div>
     );
};

export default RadioButton;
