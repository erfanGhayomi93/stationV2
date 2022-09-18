import { Switch } from '@headlessui/react';
import { createContext, FC, useContext, useState } from 'react';
import { SwitchButton } from './SwitchButton';

interface ISwitchContextType {
    checked: boolean;
}

export const SwitchContext = createContext<ISwitchContextType>({ checked: false });
export const useSwitchValue = () => useContext(SwitchContext);
interface ISwitcherType {
    children?: JSX.Element;
    defaultValue?: boolean;
}

const Switcher: FC<ISwitcherType> = ({ children = <SwitchButton />, defaultValue = false }) => {
    const [checked, setChecked] = useState<boolean>(defaultValue);
    return (
        <SwitchContext.Provider value={{ checked }}>
            <div dir="ltr" className="relative z-[1]">
                <Switch onChange={setChecked} checked={checked}>
                    {children}
                </Switch>
            </div>
        </SwitchContext.Provider>
    );
};

export default Switcher;
