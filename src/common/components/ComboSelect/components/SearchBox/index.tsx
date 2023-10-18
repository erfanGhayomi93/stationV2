import { Dispatch, FC, useContext, HTMLAttributes, useState, useEffect, InputHTMLAttributes, forwardRef, MutableRefObject } from 'react';
import { ComboSelectContext } from '../../context';
import useDebounce from '../../hooks/useDebounce';
import { useRef } from 'react';

export interface IComboSearchBoxType extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'placeholder'> {}

const ComboSearchBox = forwardRef<HTMLInputElement, IComboSearchBoxType>((inputProps, ref) => {
    const [inputValue, setInputValue] = useState<string>('');
    const {
        state: { value, placeholder, withDebounce, min, onMinimumEntered, onInputChange },
        dispatch,
    } = useContext(ComboSelectContext);

    const debouncedValue = useDebounce(inputValue, withDebounce);

    useEffect(() => {
        if (min) {
            if (debouncedValue.length < min) {
                onMinimumEntered && onMinimumEntered(true);
            } else {
                onMinimumEntered && onMinimumEntered(false);
                onInputChange && onInputChange(debouncedValue);
            }
        }
    }, [debouncedValue]);

    const setValue = (value: string) => {
        dispatch({ type: 'SET_VALUE', value });
        setInputValue(value);
    };

    return <input ref={ref} {...inputProps} value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />;
});

ComboSearchBox.displayName = 'ComboSearchBox';
export default ComboSearchBox;
