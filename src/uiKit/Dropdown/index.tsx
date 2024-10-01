import { ReactElement, useRef, forwardRef } from 'react';
import clsx from 'clsx';
import useClickOutside from '@hooks/useClickOutside';
import AnimatePresence from '@components/animation/AnimatePresence';

interface DropdownProps<T> {
    data: T[];
    isDropdownOpen: boolean;
    closeDropDowns: () => void;
    getLabel: (option: T) => string | ReactElement;
    classes?: Partial<Record<'root' | 'position' | 'options', ClassesValue | undefined>>;
    animate: string
}

const Dropdown = <T,>(
    {
        data,
        getLabel,
        isDropdownOpen,
        closeDropDowns,
        classes,
        animate
    }: DropdownProps<T>,
    ref: React.Ref<HTMLDivElement>
) => {

    const dropdownRef = useRef<HTMLDivElement>(null);
    const combinedRef = (ref as React.MutableRefObject<HTMLDivElement | null>) || dropdownRef;

    // Close dropdown when clicking outside
    useClickOutside(combinedRef, () => {
        closeDropDowns();
    }, []);

    return (
        <div ref={dropdownRef} className={clsx('relative z-50', classes?.root, { "opacity-0": !data.length })}>
            <AnimatePresence
                initial={{ animation: animate }}
                exit={{ animation: animate }}
            // onRefLoad={onPortalLoad}
            >
                <div
                    className={clsx("z-10 rounded-lg shadow w-64 absolute bg-back-surface transition-opacity p-4 rtl", {
                        "opacity-100": isDropdownOpen,
                        "opacity-0": !isDropdownOpen,
                        "top-10 left-0": !classes?.position,
                        [classes?.position as string]: !!classes?.position,
                    })}
                >
                    <ul className="text-sm overflow-auto max-h-96 min-h-6 flex flex-col">
                        {data.map((item, index) => (
                            <li
                                key={index}
                                className={clsx({
                                    'py-3 px-2 border-b border-line-div-3 last:border-b-0 w-full hover:bg-back-primary-container rounded-lg': !classes?.options,
                                    [classes?.options as string]: !!classes?.options,
                                })}
                            >
                                {getLabel(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </AnimatePresence>
        </div>
    );
};

export default forwardRef(Dropdown) as <T>(props: DropdownProps<T> & { ref?: React.Ref<HTMLDivElement> }) => ReactElement;
