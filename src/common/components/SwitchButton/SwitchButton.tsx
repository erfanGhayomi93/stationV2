import { FC } from 'react';
import { useSwitchValue } from '.';

export const SwitchButton = () => {
    const { checked } = useSwitchValue();
    return (
        <button className={`${checked ? 'bg-[#2B84FF]' : 'bg-L-gray-350 '} relative inline-flex h-[24px] w-[42px] items-center rounded-full`}>
            <span
                className={`${
                    checked ? 'translate-x-5' : 'translate-x-0.5'
                } inline-block h-[20px] w-[20px] transform rounded-full bg-white transition`}
            />
        </button>
    );
};
