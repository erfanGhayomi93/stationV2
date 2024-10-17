import clsx from 'clsx';

type TCheckboxButtonType = {
     checked: boolean;
     label: string | React.ReactNode;
     onChange: () => void;
     classes?: Partial<Record<'root' | 'label', ClassesValue>>;
};

const CheckboxButton = ({ onChange, checked, label, classes }: TCheckboxButtonType) => {
     return (
          <div
               onClick={onChange}
               className={clsx(
                    'flex cursor-pointer items-center gap-2 rounded-lg p-2',
                    classes?.root,
                    checked && 'bg-back-primary'
               )}
               tabIndex={-1}
               role="checkbox"
               aria-checked={checked}
          >
               <div style={{ padding: '2px' }} className="border-line-div-1s rounded-md border-2 border-line-div-1">
                    <div className="relative flex h-4 w-4 items-center justify-center rounded-sm">
                         {checked && (
                              <div className="absolute flex h-full w-full items-center justify-center rounded-sm bg-button-primary-default">
                                   <svg
                                        className="h-3 w-3 text-icon-white"
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

               <span className={clsx(classes?.label)}>{label}</span>
          </div>
     );
};

export default CheckboxButton;
