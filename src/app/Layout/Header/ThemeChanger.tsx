import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getTheme, setAppTheme } from 'src/redux/slices/ui';
import Switcher from 'src/common/components/SwitchButton';
import { SwitchButton } from 'src/common/components/SwitchButton/SwitchButton';
import { MoonIcon, SunIcon } from 'src/common/icons';

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
            <SwitchButton
                className={theme === 'light' ? 'bg-yellow-300' : 'bg-blue-950'}
                icon={theme === 'light' ? <SunIcon color="white" height={18} /> : <MoonIcon height={18} />}
            />
        </Switcher>
    );
};

export default ThemeChanger;
