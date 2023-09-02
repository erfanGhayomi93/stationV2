import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

let timerId: NodeJS.Timer | undefined = undefined;

const Clock = () => {
    //
    const [nowTime, setNowTime] = useState(dayjs());

    useQuery(['time'], getTime, {
        onSuccess: (data) => setNowTime(dayjs(data)),
        refetchInterval: 6 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        //
        timerId = setInterval(() => {
            setNowTime((preState) => preState.add(1, 'second'));
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <div
            //@ts-ignore
            title={dayjs().calendar('jalali').format('YYYY/MM/DD')}
            className="text-center leading-none pt-0.5 font-thin "
            style={{ minWidth: '80px', fontSize: '18px' }}
        >
            {nowTime.format('HH:mm:ss')}
        </div>
    );
};

const getTime = async () => {
    const { data } = await AXIOS.get(Apis().Time.Get as string);
    return data?.result || dayjs();
};

export default Clock;
