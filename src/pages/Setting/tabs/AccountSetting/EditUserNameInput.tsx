import React, { useRef, useEffect, useState } from 'react';
import Input from 'src/common/components/Input';
import { Check, UnCheck } from 'src/common/icons';

const EditUserNameInput = ({ toggleEditing }: { toggleEditing: () => void }) => {
    //
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('username')

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    return (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={inputRef}
            addonBefore={
                <div className="flex gap-1 items-center bg-L-basic">
                    <span
                        onClick={toggleEditing}
                        className="cursor-pointer text-L-error-200 w-6 h-6 rounded bg-L-gray-200 flex items-center justify-center"
                    >
                        <UnCheck />
                    </span>
                    <span className="cursor-pointer text-L-success-200 w-6 h-6 rounded bg-L-gray-200 flex items-center justify-center">
                        <Check />
                    </span>
                </div>
            }
        />
    );
};

export default EditUserNameInput;
