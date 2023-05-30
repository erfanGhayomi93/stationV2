import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment, HTMLAttributes } from 'react';
import { ChevronIcon } from 'src/common/icons';

interface ISelectType {
    onChange: (value: any) => void;
    value?: string;
    children: JSX.Element[] | JSX.Element;
    placeholder?: string;
    label?: JSX.Element;
    title?: string;
    icon?: JSX.Element;
    inputClassName?: string;
}

interface ISelectOptionType extends HTMLAttributes<HTMLDivElement> {
    value: any;
    label: string;
}
export const SelectOption: FC<ISelectOptionType> = ({ value, label, className = 'cursor-default select-none py-2 pl-10 pr-4' }) => {
    return (
        <Listbox.Option
            className={({ active }) =>
                clsx(
                    'relative   ',
                    className,
                    active ? 'bg-L-primary-50 dark:bg-D-primary-50 text-L-basic  ' : 'text-L-gray-500 dark:text-D-gray-500',
                )
            }
            value={value}
        >
            {({ selected }) => (
                <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{label}</span>
                    {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span> : null}
                </>
            )}
        </Listbox.Option>
    );
};

const Select: FC<ISelectType> = ({
    onChange,
    value,
    children,
    placeholder,
    title,
    label,
    inputClassName,
    icon = <ChevronIcon width={12} height={12} className="  rotate-180 text-gray-400" aria-hidden="true" />,
    ...rest
}) => {
    return (
        <div className="w-full flex items-center justify-center relative ">
            {title ? <span className="w-[64px] whitespace-nowrap relative ">{title}</span> : <></>}
            <Listbox value={value} onChange={onChange} {...rest}>
                <div className="relative  w-full ">
                    <Listbox.Button
                        className={clsx(
                            'relative flex justify-between w-full dark:focus-within:border-D-secondary-50 focus-within:border-L-secondary-50 cursor-default text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ',
                            inputClassName
                                ? inputClassName
                                : ' bg-L-basic dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350 border rounded-md  py-2 pr-3 pl-10  ',
                        )}
                    >
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span>
                        {value ? (
                            <span className="block w-full text-right  truncate text-L-gray-400 dark:text-D-gray-400">
                                <>{label}</>
                                {value}
                            </span>
                        ) : (
                            <span className="block  w-full text-right truncate text-L-gray-400 dark:text-D-gray-400">{placeholder || ' '}</span>
                        )}
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute  z-[20] mt-1 max-h-60 w-full overflow-auto rounded-md bg-L-basic dark:bg-D-basic dark:border dark:border-D-gray-300  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text">
                            {children}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default Select;
