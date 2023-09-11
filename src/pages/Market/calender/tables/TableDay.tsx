// import { useGetEventQuery } from 'api/queries/getEventQueries';
import { useMemo } from 'react';
import CardEvent from './../components/CardEvent';
import dayjs from 'dayjs';
import { AlarmClock } from 'src/common/icons';
import { useGetEventQuery } from 'src/app/queries/bourseCalender';

type TableDayType = {
    date: dayjs.Dayjs | null;
    isMeetingFiltered: boolean;
    isProfitPaymentFiltered: boolean;
    isAllSelected: boolean;
    watchlistId ?: number
}

const TableDay = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected , watchlistId }: TableDayType) => {
    const { data } = useGetEventQuery(
        {
            fromDate: date?.calendar("gregory").format("YYYY-MM-DDT00:00:00.000"),
            toDate: date?.calendar("gregory").format("YYYY-MM-DDT23:59:59.000"),
            watchlistId: watchlistId,
        }
    );

    const filteredDataByTime = useMemo(() => {
        const result: { [key: string]: GetEventType[] } = {
            "8": [],
            "9": [],
            "10": [],
            "11": [],
            "12": [],
            "13": [],
            "14": [],
            "15": [],
            "16": [],
            "17": [],
            "18": [],
            "19": [],
            "20": [],
            "21": [],
            "22": [],
            "23": []
        };

        data?.result.forEach((item: any) => {
            const d = new Date(item.date);
            const h = d.getHours();

            /* top filter */
            if (!isMeetingFiltered && item.type === "Meeting") return false;
            if (!isProfitPaymentFiltered && item.type === "InterestPayment") return false;
            /**/

            if (h >= 8 && h <= 23) {
                result[h].push(item);
            }

        });

        return result;
    }, [data?.result, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected]);


    return (
        <div className="flex flex-col overflow-y-auto">
            <div className='flex bg-L-gray-200 dark:bg-D-gray-200 rounded-tr-lg rounded-tl-lg'>
                <div className='w-10 h-10 flex justify-center items-center'>
                    <AlarmClock className='text-L-gray-500 dark:text-D-gray-500' />
                </div>
                <div className='w-full text-center p-3 text-base font-normal text-L-gray-500 dark:text-D-gray-500 border-r box-border border-r-white dark:border-r-black'>
                    {date?.format("dddd MM/DD")}
                </div>
            </div>
            <div className='flex flex-col overflow-y-auto border border-L-gray-200 dark:border-D-gray-200'>
                {
                    Object.keys(filteredDataByTime).map(((time) => (
                        <div key={time} className='flex'>
                            <div className='w-10 h-10 text-L-gray-600 dark:text-D-gray-600 flex justify-center items-center text-xs font-IRANSansFaNum'>{Number(time) % 3 === 2 ? time + ":00" : ""}</div>
                            <div className='w-full p-2 border box-border border-L-gray-200 dark:border-D-gray-200 text-xs font-normal flex flex-wrap items-center text-L-gray-700 dark:text-D-gray-700 gap-2'>
                                {filteredDataByTime[time]?.map((item) => (
                                    <CardEvent key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    )))
                }
            </div>
        </div>
    );
};

export default TableDay;