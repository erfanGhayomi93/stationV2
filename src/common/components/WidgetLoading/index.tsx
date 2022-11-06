import clsx from 'clsx';
import { FC } from 'react';
import { SpinnerIcon } from 'src/common/icons';

type IWidgetLoading = {
    children: JSX.Element | JSX.Element[];
    spining?: boolean;
};

const WidgetLoading: FC<IWidgetLoading> = ({ children, spining }) => {
    return (
        <div className="relative">
            <div
                className={clsx(
                    spining ? ' ' : '-z-20 opacity-10 scale-0',
                    'absolute inset-0 backdrop-blur-[1px] bg-white bg-opacity-20 flex justify-center items-center z-20',
                )}
            >
                <SpinnerIcon className="scale-[2.7] text-L-primary-50" />
            </div>

            {children}
        </div>
    );
};

export default WidgetLoading;