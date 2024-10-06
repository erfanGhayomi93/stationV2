import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useQueryTimeService } from '@api/Time';
import { subscribeTime } from '@LS/subscribes';
import { pushEngine } from '@LS/pushEngine';

let timerId: ReturnType<typeof setInterval> | undefined = undefined;

const Time: FC<{ date: Dayjs }> = ({ date }) => {
     const [nowTime, setNowTime] = useState(date);

     const { data, refetch } = useQueryTimeService();

     useEffect(() => {
          data && setNowTime(dayjs(data.result));
     }, [data]);

     const currentDate = () => {
          return nowTime.calendar('jalali').format('YYYY/MM/DD');
     };

     const currentTime = () => {
          return nowTime.calendar('jalali').format('HH:mm:ss');
     };

     useEffect(() => {
          timerId = setInterval(() => {
               setNowTime(preState => preState.add(1, 'second'));
          }, 1000);

          return () => {
               clearInterval(timerId);
          };
     }, [nowTime]);

     useEffect(() => {
          subscribeTime(time => {
               setNowTime(dayjs(time));
          });

          return () => {
               pushEngine.unSubscribe('TIME');
          };
     }, []);

     useEffect(() => {
          const handleFocus = () => {
               // Refetch data when the window gains focus or becomes visible
               if (document.visibilityState === 'visible') {
                    refetch();
                    // isInitialMount.current = false;
               }
          };

          // Set up event listeners for visibilitychange and focus
          if (typeof window !== 'undefined' && window.addEventListener) {
               window.addEventListener('visibilitychange', handleFocus, false);
          }

          return () => {
               // Clean up event listeners
               if (typeof window !== 'undefined' && window.removeEventListener) {
                    window.removeEventListener('visibilitychange', handleFocus);
               }
          };
     }, []);

     return (
          <div className="flex gap-x-4 text-sm font-normal text-content-title">
               <span>{currentTime()}</span>

               <span className="h-4 w-[1px] bg-line-div-1"></span>

               <span>{currentDate()}</span>
          </div>
     );
};

export default Time;
