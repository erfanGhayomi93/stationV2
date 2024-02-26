import clsx from 'clsx';
import { FormEvent } from 'react';

type Props = {
    label: string;
    value?: (string | number)[];
    onChange?: (value: (string | number)[]) => void;
    options: { value: string; label: string }[];
};

interface TContainerEvent extends Omit<FormEvent<HTMLDivElement>, 'target'> {
    target: FormEvent<HTMLDivElement>['target'] & { value: string; checked: boolean };
}

const CheckBoxGroup = ({ label = '', value = [], onChange, options }: Props) => {
    //
    const OnCheckBoxChange = (checkBoxValue: string, checked: boolean) => {
        let newValue: (string | number)[] = [];
        newValue = checked ? [...value, checkBoxValue] : value.filter((item) => item !== checkBoxValue);
        onChange && onChange(newValue);
    };

    return (
        <>
            <h5 className=" text-L-gray-600 dark:text-D-gray-700 mb-1 text-xs">{label + ':'}</h5>
            <div onChange={(e: TContainerEvent) => OnCheckBoxChange(e.target.value, e.target.checked)} className="flex gap-2">
                {options.map((item) => {
                    const checked = value.includes(item.value);

                    return (
                        <>
                            <label
                                htmlFor={item.value}
                                className={clsx(
                                    'flex-1 rounded-md flex justify-center items-center py-2 cursor-pointer transition-all duration-200',
                                    checked
                                        ? 'text-L-primary-50 border border-L-primary-50 bg-L-gray-50'
                                        : 'text-L-gray-600 border border-transparent bg-L-gray-200 ',
                                )}
                            >
                                {item.label}
                            </label>
                            <input className="hidden" name={item.value} id={item.value} type="checkbox" checked={checked} value={item.value} />
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default CheckBoxGroup;
