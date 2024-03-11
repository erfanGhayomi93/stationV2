import { useEffect, useRef, useState } from 'react';
import i18next from 'i18next';
import { IHeaderParams } from 'ag-grid-community';
import { SearchIcon } from 'src/common/icons';

interface IProps extends IHeaderParams {
    onChange: (value?: string) => void;
    value: string;
}

const HeaderSelect = ({ displayName, onChange, value }: IProps) => {
    const [isSelectActive, setIsSelectActive] = useState(false);
    const inputRef = useRef<HTMLSelectElement>(null);

    const options = [
        { value: 'All', label: i18next.t('common.all') },
        { value: 'SendError', label: i18next.t('BuySellRequestState.SendError') },
        { value: 'Registration', label: i18next.t('BuySellRequestState.Registration') },
    ];

    useEffect(() => {
        isSelectActive && inputRef.current?.focus();
    }, [isSelectActive]);

    return isSelectActive || value !== 'All' ? (
        <select
            ref={inputRef}
            value={value}
            className="w-full px-3 relative text-xs h-8 dark:focus-within:border-D-info-100 focus:outline-none focus-within:border-L-info-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-transparent   bg-L-basic dark:bg-D-basic border-L-gray-400 dark:border-D-gray-400 border rounded-md"
            onChange={(e) => onChange && onChange(e.target.value)}
            onBlur={() => setIsSelectActive(false)}
        >
            {options.map((i, x) => (
                <option key={x} value={i.value}>
                    {i.label}
                </option>
            ))}
        </select>
    ) : (
        <div className="w-full flex items-center justify-center gap-3" onClick={() => setIsSelectActive(true)}>
            <SearchIcon />
            <span>{displayName}</span>
        </div>
    );
};

export default HeaderSelect;
