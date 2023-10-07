import { cloneElement, FC, HTMLAttributes, memo, useContext, useEffect, useMemo, useRef } from 'react';
import { ComboSelectContext } from '../../context';
import useOnClickOutside from '../../hooks/useOnClickOutSide';

export interface IComboPanelType extends HTMLAttributes<HTMLDivElement> {
    children: JSX.Element;
    onBlur?: () => void;
    renderDepend?: any[];
}

const ComboPanel: FC<IComboPanelType> = ({ children, className, onBlur, renderDepend }) => {
    const {
        state: { showPanel, panelContent },
    } = useContext(ComboSelectContext);

    const panelRef = useRef(null);
    const handleClickOutside = () => {
        onBlur && onBlur();
    };
    useOnClickOutside(panelRef, handleClickOutside);

    const renderChild = useMemo(
        () => <>{cloneElement(children, { ...children.props, active: showPanel, content: panelContent })}</>,
        renderDepend ? [showPanel, panelContent, ...renderDepend] : [showPanel, panelContent],
    );
    return (
        <div ref={panelRef} className={className}>
            {renderChild}
        </div>
    );
};

ComboPanel.displayName = 'ComboPanel';
export default memo(ComboPanel);
