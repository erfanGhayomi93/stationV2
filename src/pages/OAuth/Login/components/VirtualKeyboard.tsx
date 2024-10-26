import clsx from 'clsx';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface VirtualKeyboardType {
     visibleKeypad: boolean;
     setVisibleKeypad: React.Dispatch<React.SetStateAction<boolean>>;
     onChange?: (input: string) => void;
     strech?: boolean;
}

export const VirtualKeyboard = forwardRef(
     //
     ({ visibleKeypad, setVisibleKeypad, onChange, strech }: VirtualKeyboardType, ref: any) => {
          const [layoutName, setLayoutName] = useState('default');

          const parentRef = useRef<HTMLDivElement>(null);

          const handleShift = () => {
               setLayoutName(layoutName === 'default' ? 'shift' : 'default');
          };

          useEffect(() => {
               const existsKeypadHandler = (e: any) => {
                    if (!parentRef.current?.contains(e.target)) {
                         setVisibleKeypad(false);
                    }
               };

               document.addEventListener('mouseup', existsKeypadHandler);
               return () => {
                    document.removeEventListener('mouseup', existsKeypadHandler);
               };
          }, []);

          const keyboardPressedKey = (button: unknown) => {
               if (button === '{close}') setVisibleKeypad(false);
               else if (button === '{shift}' || button === '{lock}') handleShift();
          };
          return (
               <div
                    className={clsx(!visibleKeypad && 'hidden', 'ltr absolute z-[1000] w-full text-sm', strech && '')}
                    ref={parentRef}
               >
                    <Keyboard
                         layoutName={layoutName}
                         onKeyPress={keyboardPressedKey}
                         // inputName={inputName}

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
                         display={{
                              '{bksp}': '⌫',
                              '{shift}': '⇪',
                              '{close}': '⎋',
                              '{space}': '                          ',
                         }}
                         buttonTheme={[
                              {
                                   class: 'margin-right-0',
                                   buttons: '{bksp} / \\ m | ? M',
                              },
                              {
                                   class: 'color-red',
                                   buttons: '{close}',
                              },
                              {
                                   class: 'margin-right-5',
                                   buttons: '{close} q Q  Z {shift} @',
                              },
                         ]}
                         onChange={onChange}
                         keyboardRef={r => (ref.current = r)}
                    />
               </div>
          );
     }
);

VirtualKeyboard.displayName = 'VirtualKeyboard';
