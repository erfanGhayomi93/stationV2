// import { useGetEventQuery } from 'api/queries/getEventQueries';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import CardEvent from '../../components/CardEvent';
import { useGetEventQuery } from 'src/app/queries/bourseCalender';

type TableMonthType = {
	date: dayjs.Dayjs | null;
	isMeetingFiltered: boolean;
	isProfitPaymentFiltered: boolean;
	isAllSelected: boolean
};


const TableMonthList = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }: TableMonthType) => {
	const startOfMonth = useMemo(() => (date?.startOf("month")), [date]);
	const endOfMonth = useMemo(() => (date?.endOf("month")), [date]);

	const { data } = useGetEventQuery(
		{
			fromDate: startOfMonth?.calendar("gregory").format("YYYY-MM-DDT00:00:00.000"),
			toDate: endOfMonth?.calendar("gregory").format("YYYY-MM-DDT23:59:59.000"),
			forUser: isAllSelected
		}
	)

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
		return data?.result.filter((item: any) => {
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
		<div className='overflow-auto'>
			{filteredEvents.map((events, index) => (
				<div key={index}>
					<div className={clsx("bg-L-gray-200 dark:bg-D-gray-200 flex py-4 px-7 text-L-gray-600 dark:text-D-gray-600", index === 0 && "rounded-tr-lg rounded-tl-lg")}>{daysInMonth[index]?.format("dddd MM/DD")}</div>
					<div className=''>
						<div className='p-12 border border-L-gray-200 dark:border-D-gray-200 text-xs flex flex-wrap items-center gap-2 text-L-gray-700 dark:text-D-gray-700'>
							{events.map((item: any) => (
								<CardEvent data={item} key={item.id} />
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default TableMonthList;