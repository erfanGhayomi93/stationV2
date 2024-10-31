import clsx from 'clsx';

type TCheckboxButtonType = {
     checked: boolean;
     label?: string | React.ReactNode;
     onChange: () => void;
     classes?: Partial<Record<'root' | 'label', ClassesValue>>;
};

const CheckboxButton = ({ onChange, checked, label, classes }: TCheckboxButtonType) => {
     return (
          <div
               onClick={onChange}
               className={clsx(
                    'flex cursor-pointer items-center gap-2 rounded-lg',
                    classes?.root,
                    // checked && 'bg-back-primary'
               )}
               tabIndex={-1}
               role="checkbox"
               aria-checked={checked}
          >
               <div style={{ padding: '1.5px' }} className="rounded border border-line-div-1">
                    <div className="relative flex h-[14px] w-[14px] items-center justify-center">
                         {checked && (
                              <div className="absolute flex h-full w-full items-center justify-center rounded bg-button-primary-default">
                                   <svg
                                        className="w-3 h-3 text-icon-white"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        viewBox="0 0 24 24"
                                   >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                   </svg>
                              </div>
                         )}
                    </div>
               </div>

               {label && <span className={clsx(classes?.label)}>{label}</span>}
          </div>
     );
};

export default CheckboxButton;
