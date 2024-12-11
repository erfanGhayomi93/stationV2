import clsx from 'clsx';

interface ICheckButton {
     label: string;
     checked: boolean;
     onClick: () => void;
}
const CheckButton = ({ label, checked, onClick }: ICheckButton) => {
     return (
          <button
               className={clsx('rtl flex items-center gap-2 rounded-2xl px-6 py-4 transition-colors', {
                    'bg-button-tab-deactive text-sm font-bold text-content-deselecttab': !checked,
                    'bg-button-tab-active text-sm font-bold text-content-selected': checked,
               })}
               onClick={onClick}
          >
               <div
                    className={clsx('min-h-5 min-w-5 rounded-full', {
                         'border border-content-deselecttab': !checked,
                         'flex items-center justify-center': checked,
                    })}
               >
                    {checked && (
                         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                   fillRule="evenodd"
                                   clipRule="evenodd"
                                   d="M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20ZM15.092 7.46049C15.3463 7.13353 15.2874 6.66232 14.9605 6.40802C14.6335 6.15372 14.1623 6.21262 13.908 6.53958L9.90099 11.6914C9.81189 11.806 9.64429 11.8209 9.53641 11.7238L7.00173 9.44256C6.69385 9.16547 6.21963 9.19043 5.94254 9.49831C5.66544 9.80619 5.6904 10.2804 5.99828 10.5575L8.53296 12.8387C9.28809 13.5183 10.4613 13.4143 11.085 12.6123L15.092 7.46049Z"
                                   fill="#39ACAC"
                              />
                         </svg>
                    )}
               </div>
               <span>{label}</span>
          </button>
     );
};

export default CheckButton;
