// import { useGetEventQuery } from 'api/queries/getEventQueries';
import clsx from "clsx";
import dayjs from 'dayjs';
import { useMemo } from 'react';
import CardEvent from "../../components/CardEvent";

type TableWeekListType = {
	date: dayjs.Dayjs | null,
	isMeetingFiltered: boolean,
	isProfitPaymentFiltered: boolean
	isAllSelected: boolean
}

const TableWeekList = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }: TableWeekListType) => {
	// const { data } = useGetEventQuery([
	// 	"getEventWeekOnCalender", {
	// 		fromDate: date?.subtract(6, "day")?.calendar("gregory").format("YYYY-MM-DDT00:00:00.000"),
	// 		toDate: date?.calendar("gregory").format("YYYY-MM-DDT23:59:59.000"),
	// 		forUser: isAllSelected
	// 	}
	// ]);

	const data : any = {result : []}

	const filteredEvents = useMemo(() => {

		const getDaysAsString = (num: number) => {
			return String(date?.subtract(num, "day").format("D"));
		};

		const result: { [key: string]: GetEventType[] } = {
			[getDaysAsString(6)]: [],
			[getDaysAsString(5)]: [],
			[getDaysAsString(4)]: [],
			[getDaysAsString(3)]: [],
			[getDaysAsString(2)]: [],
			[getDaysAsString(1)]: [],
			[getDaysAsString(0)]: [],
		};

		data?.result.forEach((item : any) => {
			const date = dayjs(item.date).calendar("jalali");
			const d = date.format("D");

			/* top filter */
			if (!isMeetingFiltered && item.type === "Meeting") return;
			if (!isProfitPaymentFiltered && item.type === "InterestPayment") return;
			/**/

			if (d) result[d].push(item);
		});

		return result;

	}, [data, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected]);

	return (
		<div className='overflow-auto'>
			{
				Object.keys(filteredEvents).map((day, index) => (
					<div key={day}>
						<div className={clsx("bg-L-gray-200 dark:bg-D-gray-200 flex py-3 px-6 text-L-gray-500 dark:text-D-gray-500", index === 0 && "rounded-tr-lg rounded-tl-lg")}>{date?.subtract(6 - index, "day")?.format("dddd MM/DD")}</div>
						<div>
							<div className='px-8 py-2 border border-L-gray-200 dark:border-D-gray-200 text-xs flex flex-wrap items-center gap-2 text-L-gray-700 dark:text-D-gray-700'>
								{filteredEvents[day].map((item) => (
									<CardEvent data={item} key={item.id} />
								))}
							</div>
						</div>
					</div>
				))
			}
		</div>
	);
};

export default TableWeekList;