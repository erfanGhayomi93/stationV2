import { useSwitchValue } from '.';

export const SwitchButton = () => {
    const { checked } = useSwitchValue();
    return (
        <span
            className={`${
                checked ? 'bg-[#2B84FF]' : 'bg-L-gray-400 dark:bg-D-gray-400'
            } relative outline-none inline-flex h-[24px] w-[42px] items-center rounded-full`}
        >
            <span
                className={`${
                    checked ? 'translate-x-5' : 'translate-x-0.5'
                } inline-block h-[20px] w-[20px] transform rounded-full bg-white transition`}
            />
        </span>
    );
};
