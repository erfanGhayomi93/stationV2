// import { useGetEventQuery } from 'api/queries/getEventQueries';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import CardEvent from '../../components/CardEvent';

type TableMonthGridType = {
	date: dayjs.Dayjs | null;
	isMeetingFiltered: boolean;
	isProfitPaymentFiltered: boolean;
	isAllSelected: boolean
};

const TableMonthGrid = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }: TableMonthGridType) => {
	const startOfMonth = useMemo(() => (date?.startOf("month")), [date]);
	const endOfMonth = useMemo(() => (date?.endOf("month")), [date]);
	const startOfMonthDay = useMemo(() => (startOfMonth?.day()), [date]);

	const findFirstDayInMonth = () => {
		const daysOfWeek = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
		const fridayIndex = daysOfWeek.findIndex((_, ind) => ind === startOfMonthDay);
		const daysStarting = [...daysOfWeek.slice(fridayIndex), ...daysOfWeek.slice(0, fridayIndex)];
		return daysStarting;
	};

	// const { data } = useGetEventQuery([
	// 	"getEventWeekOnCalender", {
	// 		fromDate: startOfMonth?.calendar("gregory").format("YYYY-MM-DDT00:00:00.000"),
	// 		toDate: endOfMonth?.calendar("gregory").format("YYYY-MM-DDT23:59:59.000"),
	// 		forUser: isAllSelected
	// 	}
	// ]);
	const data : any = {result : []}



	const daysInMonth = useMemo(() => {
		const days = [];
		let currentDate = startOfMonth;

		while (currentDate?.isBefore(endOfMonth) || currentDate?.isSame(endOfMonth)) {
			days.push(currentDate);
			currentDate = currentDate.add(1, 'day');
		}

		return days;
	}, [date]);

	const filteredEvents = useMemo(() => daysInMonth.map(time => {
		return data?.result.filter((item : any) => {
			/* top filter */
			if (!isMeetingFiltered && item.type === "Meeting") return false;
			if (!isProfitPaymentFiltered && item.type === "InterestPayment") return false;
			/**/
			const dateDynamic = dayjs(item.date);
			const startOfDateDynamic = dateDynamic.startOf('day');
			const startOfDateStatic = time?.startOf('day');
			if (startOfDateDynamic.isSame(startOfDateStatic)) return true;
			return false;
		}) ?? [];
	}), [daysInMonth, data, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected]);



	return (
		<div className='grid grid-rows-min-one overflow-auto'>
			<div className='flex rounded-tr-lg rounded-tl-lg overflow-hidden'>
				{findFirstDayInMonth().map((col, index1) => (
					<div key={index1} className={clsx('flex-1 justify-center items-center text-center bg-L-gray-200 dark:bg-D-gray-200 py-4 text-L-gray-600 dark:text-D-gray-600', {
						"border-l border-L-basic dark:border-D-basic": findFirstDayInMonth().length !== index1 + 1
					})}>{col}</div>
				))}
				{/* <div style={{ width: "8px" }} className=' bg-L-gray-200 dark:bg-D-gray-200'></div> */}
			</div>

			<div className='grid grid-cols-7 overflow-auto'>
				{filteredEvents.map((item, ind) => (
					<div key={ind} className='border border-L-gray-200 dark:border-D-gray-200 p-2'>
						<span className='text-base font-medium text-L-gray-600 dark:text-D-gray-600'>
							{ind + 1}
						</span>
						{
							item.map((card  :any) => (
								<CardEvent data={card} key={card.id} />
							))
						}
					</div>
				))}
			</div>
		</div>
	);
};

export default TableMonthGrid;