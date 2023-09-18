import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { SpinnerIcon } from 'src/common/icons';

type IWidgetLoading = {
    children: JSX.Element | JSX.Element[];
    spining?: boolean;
    blur?: boolean;
};

const WidgetLoading: FC<IWidgetLoading> = ({ children, spining }) => {

    // const nodeChildren = useMemo(() => children, [children])
    
    return (
        <div className="relative w-full h-full">
            <div
                className={clsx(
                    spining ? ' ' : '-z-20 opacity-10 scale-0',
                    'absolute inset-0 backdrop-blur-[1px] bg-white bg-opacity-20 flex justify-center items-center z-20',
                )}
            >
                {spining && <SpinnerIcon className="scale-[2.7] text-L-primary-50" />}
            </div>
                        
            {children}
        </div>
    );
};

export default WidgetLoading;

// const WidgetLoading: FC<IWidgetLoading> = ({ spining, children, blur }) => {
//     if (spining) {
//         return (
//             <div className="w-full h-full relative">
//                 <div className="absolute inset-0 flex justify-center items-center z-20">
//                     <div>
//                         <SpinnerIcon className="scale-[2.7] text-L-primary-50 dark:text-D-primary-50" />
//                     </div>
//                 </div>
//                 <div className={clsx("w-full h-full", {
//                     "blur-sm": !!blur
//                 })}>
//                     {children}
//                 </div>
//             </div>
//         );
//     }

//     return <>{children}</>;
// };

// export default WidgetLoading;
