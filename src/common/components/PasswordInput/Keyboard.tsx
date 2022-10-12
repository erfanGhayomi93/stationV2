import { useRef, useState, useContext, useEffect } from 'react';
import KeyboardReact, { SimpleKeyboard } from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { PasswordInputContext } from '.';

interface props {
    onChange: (e: any) => void;
    showKeyboard: boolean;
    setShowKeyboard: (e: boolean) => void;
}
const Keyboard = ({ onChange, showKeyboard, setShowKeyboard }: props) => {
    const keypadLayout = useRef<SimpleKeyboard>();
    const [layoutName, setLayoutName] = useState('default');
    const { value } = useContext(PasswordInputContext);
    useEffect(() => {
        value && keypadLayout.current?.setInput(value);
    }, [value]);

    const handleShift = () => {
        setLayoutName(layoutName === 'default' ? 'shift' : 'default');
    };

    const keyboardPressedKey = (button: any) => {
        if (button === '{close}') setShowKeyboard(false);
        else if (button === '{shift}' || button === '{lock}') handleShift();
    };

    return (
        <div className={`absolute w-full z-10 origin-top duration-300 ${showKeyboard ? 'scale-y-1' : 'scale-y-0'}`}>
            <KeyboardReact
                onChange={(e: any) => onChange(e)}
                layoutName={layoutName}
                keyboardRef={(r) => {
                    keypadLayout.current = r;
                }}
                theme={'hg-theme-default shadow-xl pl-2'}
                onKeyPress={keyboardPressedKey}
                layout={{
                    default: [
                        '{bksp} = - 0 9 8 7 6 5 4 3 2 1 ` {close}',
                        '\\ [ ] p o i u y t r e w q',
                        "/ . , ' ; l k j h g f d s a {shift}",
                        'm n b v {space} c x z @',
                    ],
                    shift: [
                        '{bksp} + _ ( ) * & ^ % $ # @ ! ~ {close}',
                        '| { } P O I U Y T R E W Q',
                        '? < > " : L K J H G F D S A {shift}',
                        'M N B V {space} C X Z',
                    ],
                }}
                display={{
                    '{bksp}': '⌫',
                    '{shift}': '⇪',
                    '{close}': '⎋',
                    '{space}': '                          ',
                }}
                buttonTheme={[
                    {
                        class: 'text-danger-500 text-3xl',
                        buttons: '{close}',
                    },
                    {
                        class: 'size-key',
                        buttons: '{bksp}{shift}',
                    },
                    {
                        class: 'text-theme-250 dark:text-dark-theme-250',
                        buttons: '{shift} {bksp}',
                    },
                    {
                        class: 'ml-1.5',
                        buttons: '` w a z ~ W A X',
                    },
                ]}
            />
        </div>
    );
};

export default Keyboard;
