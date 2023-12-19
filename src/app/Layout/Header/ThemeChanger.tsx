import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getTheme, setAppTheme } from 'src/redux/slices/ui';
import Switcher from 'src/common/components/SwitchButton';
import { useSwitchValue } from 'src/common/components/SwitchButton';
import { MoonIcon, SunIcon } from 'src/common/icons';
import clsx from 'clsx';

const ThemeChanger = () => {
    //
    const theme = useAppSelector(getTheme);
    const appDispatch = useAppDispatch();

    return (
        <Switcher
            value={theme === 'light' ? false : true}
            onCheck={() => {
                appDispatch(setAppTheme(theme === 'dark' ? 'light' : 'dark'));
            }}
            className="flex mx-2"
        >
            <SwitchButton icon={theme === 'light' ? <SunIcon color="white" height={14} /> : <MoonIcon height={14} />} />
        </Switcher>
    );
};

export default ThemeChanger;

const SwitchButton = ({ icon }: { icon?: any }) => {
    const { checked } = useSwitchValue();
    return (
        <span className={clsx('relative outline-none flex h-5 w-10 items-center rounded-full', checked ? 'bg-[#2C529033]' : 'bg-[#FFB11A26]')}>
            <span
                className={clsx(
                    'flex justify-center items-center h-6 w-6 transform rounded-full transition-transform',
                    checked ? 'translate-x-[1.1rem] bg-[#2C5290]' : 'bg-[#F5A300]',
                )}
            >
                {icon && icon}
            </span>
        </span>
    );
};
