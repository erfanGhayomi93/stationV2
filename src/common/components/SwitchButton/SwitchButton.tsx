import { useSwitchValue } from '.';

export const SwitchButton = () => {
    const { checked } = useSwitchValue();
    return (
        <span
            className={`${
                checked ? 'bg-[#2B84FF]' : 'bg-L-gray-400 dark:bg-D-gray-400'
            } relative outline-none inline-flex h-6 w-10 items-center rounded-full`}
        >
            <span
                className={`${
                    checked ? 'translate-x-[1.1rem]' : 'translate-x-0.5'
                } inline-block h-5 w-5 transform rounded-full bg-white transition`}
            />
        </span>
    );
};
