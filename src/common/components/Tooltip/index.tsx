import { FC } from 'react';

type TOoltip = {
    children: string | JSX.Element;
    title: string | JSX.Element;
    position?: 'right' | 'left' | 'top' | 'bottom';
};

const Tooltip: FC<TOoltip> = ({ children, title, position = 'left' }) => {
    return (
        <div className="group relative">
            {children}
            <span
                style={{
                    [position]: '-10px',
                }}
                className={`opacity-0 group-hover:opacity-100 duration-200 pointer-events-none absolute whitespace-nowrap px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm z-50
                ${
                    position === 'bottom'
                        ? 'translate-y-full right-1/2 translate-x-1/2'
                        : position === 'top'
                        ? '-translate-y-full right-1/2 translate-x-1/2'
                        : position === 'right'
                        ? 'translate-x-full -translate-y-1/2 top-1/2'
                        : '-translate-x-full -translate-y-1/2 top-1/2'
                }`}
            >
                {title}
            </span>
        </div>
    );
};

export default Tooltip;
