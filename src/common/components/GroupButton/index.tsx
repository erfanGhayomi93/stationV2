import clsx from 'clsx';
import { FC, useState } from 'react';
type Item = { value: string; label: string };

interface IGroupAnimationButtonType {
    width: number;
    items: Item[];
    onSelect?: (value: string) => void;
}

const GroupAnimationButton: FC<IGroupAnimationButtonType> = ({ items, width, onSelect }) => {
    const [active, setActive] = useState(items[0].value);
    const handleSetActive = (value: string) => {
        setActive(value);
        onSelect && onSelect(value);
    };

    return (
        <div className="  px-1 inline-flex rounded-md ">
            <div className="inline-flex  text-1.1  relative overflow-hidden py-1">
                {items.map((item, key) => (
                    <button
                        key={key}
                        data-actived={active === item.value}
                        onClick={() => handleSetActive(item.value)}
                        style={{ width }}
                        className="rounded-r relative overflow-hidden inline-block z-10  actived:text-white py-1  text-slate-500 font-medium text-1.1 leading-tight uppercase   actived:outline-none actived:ring-0 transition duration-150 ease-in-out before:w-full before:actived:translate-y-0 before:translate-y-full before:duration-300 before:h-[102%] before:absolute before:top-0 before:left-0 before:bg-L-primary-50 before:-z-10 before:rounded-md"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GroupAnimationButton;
