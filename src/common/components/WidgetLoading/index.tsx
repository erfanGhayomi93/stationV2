import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type IWidgetLoading = {
    children: JSX.Element | JSX.Element[];
    spining?: boolean;
    blur?: boolean;
    withText?: boolean;
};

const WidgetLoading: FC<IWidgetLoading> = ({ children, spining, withText = false }) => {
    //
    const { t } = useTranslation();
    return (
        <div className="relative w-full h-full">
            <div
                className={clsx(
                    spining ? ' ' : '-z-20 opacity-10 scale-0',
                    'absolute inset-0 backdrop-blur-[1px] flex flex-col gap-2 justify-center items-center z-20',
                )}
            >
                <div className="w-10 h-10 border-2 border-l-transparent rounded-full border-L-primary-50 dark:border-D-primary-50 dark:border-l-transparent animate-spin duration-75"></div>
                {withText && <span className="font-medium text-xs text-L-gray-700 dark:text-D-gray-700">{t('common.fetchingData')}</span>}
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
