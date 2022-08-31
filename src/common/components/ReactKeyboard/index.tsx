////////////////////////////////////////////////////////////
//
//
//      check the classNames used in this file
//
//
////////////////////////////////////////////////////////////

import React from 'react';
import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface Props {
    isShown: boolean;
    onKeyPress: (key: string) => void;
}
const ReactKeyboard = ({ isShown, onKeyPress }: Props) => {
    //
    const [isShiftMode, setIsShiftMode] = useState(false);

    const mapOnKeyPress = (key: string) => {
        if (key === '{shift}') {
            setIsShiftMode(!isShiftMode);
            return;
        }
        onKeyPress(key);
    };

    return (
        <div style={{ position: 'relative' }}>
            <div
                dir="ltr"
                style={{
                    width: '100%',
                    position: 'absolute',
                    display: isShown ? 'block' : 'none',
                    color: 'black',
                    zIndex: '10',
                }}
            >
                <Keyboard
                    layoutName={isShiftMode ? 'shift' : 'default'}
                    display={{
                        '{bksp}': '⇦',
                        '{shift}': '⇪',
                        '{close}': '×',
                        '{space}': '                          ',
                    }}
                    theme={`hg-theme-default hg-layout-default darkTheme`}
                    buttonTheme={[
                        {
                            class: 'close-keys fs-2 text-danger',
                            buttons: '{close}',
                        },
                        {
                            class: 'submit-key',
                            buttons: '{enter}',
                        },
                        {
                            class: 'size-key fs-4 text-danger fw-bolder',
                            buttons: '{bksp}',
                        },
                        {
                            class: 'size-key text-info fs-4 fw-bolder',
                            buttons: '{shift}',
                        },
                    ]}
                    layout={{
                        default: [
                            '{close} ` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                            'q w e r t y u i o p [ ] \\',
                            "{shift} a s d f g h j k l ; ' , . /",
                            '@ z x c {space} v b n m',
                        ],
                        shift: [
                            '{close} ~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                            'Q W E R T Y U I O P { } |',
                            '{shift} A S D F G H J K L : " < > ?',
                            'Z X C {space} V B N M',
                        ],
                    }}
                    onKeyPress={mapOnKeyPress}
                />
            </div>
        </div>
    );
};

export default React.memo(ReactKeyboard);
