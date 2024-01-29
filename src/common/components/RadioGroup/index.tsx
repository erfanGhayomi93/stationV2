import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

type Props = {
    label?: string;
    value?: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
};

const RadioField = ({ label = '', value, onChange, options }: Props) => {
    return (
        <RadioGroup value={value} onChange={onChange}>
            <RadioGroup.Label className=" text-L-gray-600 dark:text-D-gray-700 mb-2 text-xs">{label + ':'}</RadioGroup.Label>
            <div className="flex items-center gap-2 my-2 flex-nowrap">
                {options.map((item, index) => (
                    <div key={index} className=" w-full flex justify-center items-center h-full ">
                        <RadioGroup.Option key={index} value={item.value} className={'block w-full'}>
                            {({ checked }) => (
                                <div
                                    className={clsx(
                                        'flex-1 rounded-md flex justify-center items-center py-2 cursor-pointer',
                                        checked
                                            ? 'text-L-primary-50 border border-L-primary-50 bg-L-gray-50'
                                            : 'text-L-gray-600 border border-transparent bg-L-gray-200 ',
                                    )}
                                >
                                    {item.label}
                                </div>
                            )}
                        </RadioGroup.Option>
                    </div>
                ))}
            </div>
        </RadioGroup>
    );
};

export default RadioField;
