// import { useGetEventQuery } from 'api/queries/getEventQueries';
import clsx from "clsx";
import dayjs from 'dayjs';
import { useMemo } from 'react';
import CardEvent from '../../components/CardEvent';
import { AlarmClock } from "src/common/icons";
import { useGetEventQuery } from "src/app/queries/bourseCalender";

type TableWeekGridType = {
	date: dayjs.Dayjs | null,
	isMeetingFiltered: boolean,
	isProfitPaymentFiltered: boolean,
	isAllSelected: boolean
}

const TableWeekGrid = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }: TableWeekGridType) => {
	const { data } = useGetEventQuery(
		{
			fromDate: date?.subtract(6, "day")?.calendar("gregory").format("YYYY-MM-DDT00:00:00.000"),
			toDate: date?.calendar("gregory").format("YYYY-MM-DDT23:59:59.000"),
			forUser: isAllSelected
		}
	);

	const hourRanges = useMemo(() => ([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]), []);

	const dayRanges = useMemo(() => [
		date?.subtract?.(6, "day"),
		date?.subtract?.(5, "day"),
		date?.subtract?.(4, "day"),
		date?.subtract?.(3, "day"),
		date?.subtract?.(2, "day"),
		date?.subtract?.(1, "day"),
		date?.subtract?.(0, "day")
	], [date]);


	const filterByHourAndDay = useMemo(() => {
		return (item: GetEventType, dateRange: dayjs.Dayjs | undefined, timeRange: number) => {
			/* top filter */
			if (!isMeetingFiltered && item.type === "Meeting") return false;
			if (!isProfitPaymentFiltered && item.type === "InterestPayment") return false;
			/**/
			const dateDynamic = dayjs(item.date);
			const startOfDateDynamic = dateDynamic.startOf('day');
			const startOfDateRange = dateRange?.startOf('day');
			const hour = dateDynamic.hour();
			return (
				startOfDateDynamic.isSame(startOfDateRange) &&
				hour >= timeRange &&
				hour < timeRange + 1
			);
		};
	}, [date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected]);


	return (
		<div className='overflow-y-auto h-full'>
			<div className="flex flex-col overflow-y-auto h-full">
				<div className='flex bg-L-gray-200 dark:bg-D-gray-200 rounded-tr-lg rounded-tl-lg'>
					<div className='w-10 h-10 box-content border-l border-L-basic dark:border-D-basic flex justify-center items-center'>
						<AlarmClock />
					</div>
					{dayRanges.map((col, index) => (
						<div className={clsx('flex justify-center items-center text-L-gray-500 dark:text-D-gray-500 flex-1', {
							"border-l border-L-basic dark:border-D-basic": 7 !== index + 1

						})} key={index}>{col?.format("dddd MM/DD")}</div>
					))}

				</div>
				<div className='flex flex-col overflow-auto border border-L-gray-200 dark:border-D-gray-200 h-full'>
					{hourRanges.map((hourRange) => (
						<div key={hourRange} className='flex'>
							<div className='text-L-gray-600 dark:text-D-gray-600 w-10 h-10 flex justify-center items-center text-sm font-IRANSansFaNum'>
								{hourRange % 3 === 2 ? `${hourRange}:00` : ''}
							</div>
							{dayRanges.map((dayRange, innerIndex) => (
								<div key={innerIndex} className={clsx('flex-1')}>
									<div className='w-full h-full p-3 border border-L-gray-200 dark:border-D-gray-200 text-xs flex flex-wrap gap-2 items-start content-start align-top text-L-gray-700 dark:text-D-gray-700'>
										{data?.result?.filter((item: any) => filterByHourAndDay(item, dayRange, hourRange))?.map((item: any) => (
											<CardEvent key={item.id} data={item} />
										))}
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TableWeekGrid;