import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment } from 'react';
import { ChevronIcon } from 'src/common/icons';

interface IMultiSelectType {
    onChange: (value: string[]) => void;
    value?: string[];
    placeholder?: string;
    label?: JSX.Element;
    title?: string;
    icon?: JSX.Element;
    inputClassName?: string;
    listClassName?: string;
    options: ISelectOptionType[];
}

interface ISelectOptionType {
    value: number | string;
    label: string | JSX.Element;
}

const MultiSelect: FC<IMultiSelectType> = ({
    onChange,
    value,
    placeholder,
    title,
    label,
    inputClassName,
    options,
    listClassName,
    icon = <ChevronIcon width={12} height={12} className="  rotate-180 text-gray-400" aria-hidden="true" />,
    ...rest
}) => {
    return (
        <div className="w-full flex items-center justify-center relative ">
            {title ? <span className="w-[64px] whitespace-nowrap relative ">{title}</span> : <></>}
            <Listbox multiple value={value} onChange={onChange} {...rest}>
                <div className="relative  w-full ">
                    <Listbox.Button
                        className={clsx(
                            'h-full relative flex justify-between w-full dark:focus-within:border-D-infoo-100 focus-within:border-L-info-100 cursor-default text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ',
                            inputClassName
                                ? inputClassName
                                : ' bg-L-basic dark:bg-D-basic border-L-gray-400 dark:border-D-gray-400 border rounded-md  py-1.5 pr-3 pl-10  ',
                        )}
                    >
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span>
                        {value?.length ? (
                            <span className="block w-full text-right ltr truncate text-L-gray-500 dark:text-D-gray-500">
                                <>{label}</>
                                {value.length > 1 && <span className="mr-1">{value.length - 1}+</span>}
                                <span className="">{value[0]}</span>
                            </span>
                        ) : (
                            <span className="block  w-full text-right truncate text-L-gray-500 dark:text-D-gray-500">{placeholder || ' '}</span>
                        )}
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute  z-[20] mt-1 max-h-60 w-full overflow-auto rounded-md bg-L-basic dark:bg-D-basic dark:border dark:   py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text">
                            {options?.map((x, ind) => (
                                <Listbox.Option
                                    key={ind}
                                    className={({ active }) =>
                                        clsx(
                                            'relative',
                                            listClassName,
                                            active ? 'bg-L-primary-50 dark:bg-D-primary-50 text-L-basic  ' : 'text-L-gray-500 dark:text-D-gray-700',
                                        )
                                    }
                                    value={x.value}
                                >
                                    {({ selected }) => {
                                        return (
                                            <div className="flex gap-1 p-2 select-none cursor-pointer">
                                                <input id={`${x.value}`} type="checkbox" checked={selected} onChange={() => {}} />

                                                <span className={`block truncate text-xs`}>{x.label}</span>
                                            </div>
                                        );
                                    }}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default MultiSelect;
