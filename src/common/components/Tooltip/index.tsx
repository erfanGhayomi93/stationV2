import { FC } from 'react';

type TOoltip = {
    children : string | JSX.Element ;
    title : string | JSX.Element ;
}

const Tooltip: FC<TOoltip> = ({children , title}) => {
    return (
        <div className='group relative'>
            {children}
            <span className="hidden group-hover:inline-block absolute whitespace-nowrap right-[60px] px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm z-50 top-2  before:content-[''] before:absolute before:top-1/2  before:-right-5 before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-r-transparent before:border-gray-700">
                {title}
            </span>
        </div>
    );
};

export default Tooltip;
