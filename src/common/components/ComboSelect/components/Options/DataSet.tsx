import { FC, HTMLAttributes, memo, MouseEvent, MouseEventHandler, useContext, useEffect, useState } from 'react';
import { ComboSelectContext } from '../../context';

interface IComboDataSetType extends HTMLAttributes<HTMLDivElement> {
    children: JSX.Element | JSX.Element[] | string;
    value: any;
    label: string;
}
const getObjectItemOrItem = (item: any, keyId?: string | string[]) => {
    if (typeof keyId === 'string') {
        return item[keyId];
    } else {
        return item;
    }
};

const ComboDataSet: FC<IComboDataSetType> = ({ children, value, label, className }) => {
    const {
        state: { onSelectionChange, multiple, selections, keyId },
        dispatch,
    } = useContext(ComboSelectContext);

    const [checked, setChecked] = useState(selections?.some((item) => getObjectItemOrItem(item, keyId) === getObjectItemOrItem(value, keyId)));

    const handleSelection = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        !multiple && handleSingleSelection(value);
        multiple && handleToggleSelection(value);
    };

    useEffect(() => {
        setChecked(selections?.some((item: any) => getObjectItemOrItem(item, keyId) === getObjectItemOrItem(value, keyId)));
    }, [selections]);
    
    const handleSingleSelection = (value: any) => {
        dispatch({ type: 'SET_VALUE', value: label });
        dispatch({ type: 'TOGGLE_SELECTED', value: [value] });
        onSelectionChange && onSelectionChange([value]);
    };

    const handleToggleSelection = (value: any) => {
        if (selections?.find((item) => getObjectItemOrItem(item, keyId) === getObjectItemOrItem(value, keyId))) {
            const newSelection = selections.filter((item) => getObjectItemOrItem(item, keyId) !== getObjectItemOrItem(value, keyId));
            dispatch({ type: 'TOGGLE_SELECTED', value: newSelection });
            onSelectionChange && onSelectionChange(newSelection);
        } else {
            const newSelection = [...(selections || []), value];

            dispatch({ type: 'TOGGLE_SELECTED', value: newSelection });
            onSelectionChange && onSelectionChange(newSelection);
        }
    };
    return (
        <div onClick={(e) => handleSelection(e)} className={className}>
            {multiple && <input type={'checkbox'} checked={checked} onChange={() => {}} />}
            {children}
        </div>
    );
};
ComboDataSet.displayName = 'ComboDataSet';
export default memo(ComboDataSet);
