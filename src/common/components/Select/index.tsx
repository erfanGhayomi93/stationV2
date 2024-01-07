import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment } from 'react';
import { ChevronIcon } from 'src/common/icons';

interface ISelectType {
    onChange: (value: any) => void;
    value?: string | boolean | number;
    placeholder?: string;
    label?: JSX.Element;
    title?: string;
    icon?: JSX.Element;
    inputClassName?: string;
    options: ISelectOptionType[];
    disabled?: boolean
}

interface ISelectOptionType {
    value: string | number | boolean;
    label: string;
}

const Select: FC<ISelectType> = ({
    onChange,
    value,
    placeholder,
    title,
    options,
    label,
    inputClassName,
    icon = <ChevronIcon width={12} height={12} className="  rotate-180 text-gray-400" aria-hidden="true" />,
    disabled = false,
    ...rest
}) => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {title ? <span className="w-16 whitespace-nowrap relative ml-2">{title}</span> : <></>}
            <Listbox disabled={disabled} value={value} onChange={onChange} {...rest}>
                <div className="relative w-full ">
                    <Listbox.Button
                        className={clsx(
                            'relative text-xs flex justify-between h-8 w-full dark:focus-within:border-D-info-100 focus-within:border-L-info-100 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ',
                            {
                                ' bg-L-basic dark:bg-D-basic border-L-gray-400 dark:border-D-gray-400 border rounded-md  py-2 pr-3 pl-10  ': !inputClassName,
                                [inputClassName as string]: !!inputClassName,
                                "!border-L-gray-200 dark:!border-D-gray-200 cursor-auto": !!disabled
                            }
                        )}
                    >
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span>
                        {value !== null && value !== undefined ? (
                            <span className={clsx("block w-full max-w-full text-right  truncate text-L-gray-500 dark:text-D-gray-500 whitespace-nowrap", {
                                "text-L-gray-200 dark:text-D-gray-200": !!disabled
                            })}>
                                <>{label}</>
                                {options?.find((op) => op.value === value)?.label}
                            </span>
                        ) : (
                            <span className="block w-full text-right truncate text-L-gray-500 dark:text-D-gray-500">{placeholder || ' '}</span>
                        )}
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute border border-L-gray-400 dark:border-D-gray-400 z-[20] mt-1 max-h-60 w-full overflow-auto rounded-md bg-L-basic dark:bg-D-basic  py-1 text-base shadow-md focus:outline-none ">
                            {options?.map((item, ind) => (
                                <Listbox.Option
                                    key={ind}
                                    className={({ active }) =>
                                        clsx(
                                            'relative text-xs cursor-pointer text-D-basic dark:text-L-basic',
                                            'cursor-default select-none py-2 pl-2 pr-2',
                                            active
                                                ? 'bg-L-primary-100 dark:bg-D-primary-100'
                                                : 'even:bg-L-gray-100 dark:even:bg-D-gray-100',
                                        )
                                    }
                                    value={item.value}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item.label}</span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default Select;
