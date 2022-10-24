import React, { FC } from 'react';
import { ArrowLeft, ArrowRight, BrokerWhite_173 } from 'src/common/icons';
import clsx from 'clsx';

type TOggleSlider = {
    onOpen?: () => void;
    onClose?: () => void;
    type: 'open' | 'close';
};

const ToggleSlider: FC<TOggleSlider> = ({ type, onOpen, onClose }) => {
    return (
        <>
            <button className="p-3 rounded-md flex items-center" onClick={onOpen}>
                <BrokerWhite_173 />
                {type === 'close' && <span className="pr-2">کارگزاری تدبیرگر سرمایه</span>}
            </button>
            <div
                className={clsx('w-full flex items-center', {
                    relative: type === 'open',
                })}
            >
                <span className="bg-gray-500 w-[calc(100%-16px)] h-[1px] block ml-1" />
                {type === 'open' && <ArrowLeft className="absolute left-[-12px] cursor-pointer z-10" width={24} height={24} onClick={onOpen} />}
                {type === 'close' && <ArrowRight className="absolute left-0 cursor-pointer z-50" width={24} height={24} onClick={onClose} />}
            </div>
        </>
    );
};

export default ToggleSlider;
