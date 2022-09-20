import { Switch } from '@headlessui/react';
import { createContext, FC, useContext, useState, useEffect } from 'react';
import { SwitchButton } from './SwitchButton';

interface ISwitchContextType {
    checked: boolean;
}

export const SwitchContext = createContext<ISwitchContextType>({ checked: false });
export const useSwitchValue = () => useContext(SwitchContext);
interface ISwitcherType {
    children?: JSX.Element;
    defaultValue?: boolean;
    value?: boolean;
    onCheck?: (value: boolean) => void;
}

const Switcher: FC<ISwitcherType> = ({ children = <SwitchButton />, defaultValue = false, onCheck, value }) => {
    const [checked, setChecked] = useState<boolean>(defaultValue);
    return (
        <SwitchContext.Provider value={{ checked: value ? value : checked }}>
            <div dir="ltr" className="relative z-[1] outline-none">
                <Switch onChange={onCheck ? onCheck : setChecked} checked={value ? value : checked}>
                    {children}
                </Switch>
            </div>
        </SwitchContext.Provider>
    );
};

export default Switcher;
