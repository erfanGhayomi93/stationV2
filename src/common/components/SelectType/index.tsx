import { Combobox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment, useCallback, useMemo, useState } from 'react';
import { ChevronIcon } from 'src/common/icons';

type valueType = { id: string; title: string };

interface ComboboxComponentProps<T> {
    options: T[];
    value: T | null;
    onChange: (value: T | null) => void;
    placeholder: string;
    classSelect?: string;
}

const SelectType: FC<ComboboxComponentProps<valueType>> = ({ options, value, onChange, placeholder, classSelect }) => {
    const [query, setQuery] = useState('');

    const optionPerfect = useMemo(() => {
        return options ? [{ id: '', title: 'همه' }, ...options] : [];
    }, [options]);

    const filteredOptions = useMemo(() => {
        if (query === '') return optionPerfect;
        return optionPerfect.filter((option) => option.title.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')));
    }, [optionPerfect, query]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }, []);

    return (
        <Combobox value={value} onChange={onChange}>
            <div className="relative z-40">
                <div className="w-full">
                    <Combobox.Button className="">
                        <Combobox.Input
                            className={clsx(
                                'relative w-full cursor-default overflow-hidden rounded-lg bg-white text-right shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 sm:text-sm border py-2 pr-3 pl-8',
                                {
                                    'bg-L-basic dark:bg-D-basic border-L-gray-400 dark:border-D-gray-400 focus-visible:border-L-primary-50 dark:focus-visible:border-D-primary-50 ':
                                        !classSelect,
                                    [classSelect as string]: !!classSelect,
                                },
                            )}
                            onChange={handleInputChange}
                            displayValue={(value: valueType) => value.title}
                            placeholder={placeholder}
                            autoComplete="off"
                        />
                    </Combobox.Button>
                    <Combobox.Button className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <ChevronIcon width={12} height={12} className="rotate-180 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredOptions.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">موردی یافت نشد</div>
                        ) : (
                            filteredOptions.map((option) => (
                                <Combobox.Option
                                    key={option.id}
                                    className={({ active }) =>
                                        clsx('relative cursor-default select-none py-2 px-4', {
                                            'bg-L-primary-50 text-white': active,
                                        })
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <span
                                            className={clsx('block truncate', {
                                                'font-medium': selected,
                                            })}
                                        >
                                            {option.title}
                                        </span>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
};

export default SelectType;
