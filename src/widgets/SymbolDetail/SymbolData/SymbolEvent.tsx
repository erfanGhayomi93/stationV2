import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import { SandClockIcon } from 'src/common/icons';

const SymbolEvent = ({ events }: { events: SymbolEvents[] }) => {
    //
    const allEventsIds = events.map(({ id }) => id);
    const mergedAllEventsIds = allEventsIds.join(''); // => unique string for save in ls.

    const [seen, setSeen] = useLocalStorage<boolean>('symbolEvent' + mergedAllEventsIds, false);
    const navigate = useNavigate();

    const symbolEventHandler = () => {
        setSeen(true);
        navigate('/Market/Calender', { state: allEventsIds });
    };

    return (
        <span onClick={symbolEventHandler} className={clsx('cursor-pointer ml-2', [!seen && 'animate-spin-slow'])}>
            <SandClockIcon />
        </span>
    );
};

export default SymbolEvent;
