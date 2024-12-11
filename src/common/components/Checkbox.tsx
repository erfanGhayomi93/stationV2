interface ICheckBoxProps {
     checked?: boolean;
     onChange?: () => void;
     label?: string;
}

const Checkbox = ({ onChange, label, checked }: ICheckBoxProps) => {
     return (
          <div onClick={onChange} className="flex items-center gap-2">
               <div className="flex h-5 w-5 items-center justify-center rounded border border-line-div-1">
                    {checked && (
                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                   d="M0.5 6.90043C0.5 4.66022 0.5 3.54011 0.935974 2.68447C1.31947 1.93182 1.93139 1.31989 2.68404 0.936401C3.53969 0.500427 4.65979 0.500427 6.9 0.500427H9.1C11.3402 0.500427 12.4603 0.500427 13.316 0.936401C14.0686 1.31989 14.6805 1.93182 15.064 2.68447C15.5 3.54011 15.5 4.66022 15.5 6.90043V9.10043C15.5 11.3406 15.5 12.4607 15.064 13.3164C14.6805 14.069 14.0686 14.681 13.316 15.0645C12.4603 15.5004 11.3402 15.5004 9.1 15.5004H6.9C4.65979 15.5004 3.53969 15.5004 2.68404 15.0645C1.93139 14.681 1.31947 14.069 0.935974 13.3164C0.5 12.4607 0.5 11.3406 0.5 9.10043V6.90043Z"
                                   fill="#39ACAC"
                              />
                              <path
                                   d="M3.83203 7.9273L6.35026 10.4481C6.45415 10.5484 6.59288 10.6044 6.73724 10.6044C6.88161 10.6044 7.02033 10.5484 7.12422 10.4481L12.1654 5.39606"
                                   stroke="#FCFCFC"
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                              />
                         </svg>
                    )}
               </div>

               <span className="text-sm text-content-title">{label}</span>
          </div>
     );
};

export default Checkbox;
