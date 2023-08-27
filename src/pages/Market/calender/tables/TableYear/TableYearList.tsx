// import { useGetEventQuery } from 'api/queries/getEventQueries';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import CardEvent from '../../components/CardEvent';
import { yearMonthsName } from 'src/constant/datepicker';

type TableYearListType = {
	date: dayjs.Dayjs | null,
	isMeetingFiltered: boolean;
	isProfitPaymentFiltered: boolean;
	isAllSelected: boolean
}

const TableYearList = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }: TableYearListType) => {
	const startOfMonth = useMemo(() => (date?.startOf("year")), [date]);
	const endOfMonth = useMemo(() => (date?.endOf("year")), [date]);

	// const { data } = useGetEventQuery([
	// 	"getEventWeekOnCalender", {
	// 		fromDate: startOfMonth?.calendar("gregory").format("YYYY-MM-DDT00:00:00.000"),
	// 		toDate: endOfMonth?.calendar("gregory").format("YYYY-MM-DDT23:59:59.000"),
	// 		forUser: isAllSelected
	// 	}
	// ]);

	const data : any = {result : []}


	const filteredEvents = useMemo(() => yearMonthsName.map((_, indMonth) => {
		return data?.result.filter((item : any) => {
			/* top filter */
			if (!isMeetingFiltered && item.type === "Meeting") return false;
			if (!isProfitPaymentFiltered && item.type === "InterestPayment") return false;
			/**/
			const dateDynamic = dayjs(item.date);
			if (dateDynamic.calendar("jalali").year() !== date?.calendar("jalali").year()) {
				return false;
			}
			const monthDynamic = dateDynamic.calendar("jalali").month();
			if (monthDynamic === indMonth) return true;
			return false;
		}) ?? [];
	}), [date, data, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected]);



	return (
		<div className="overflow-y-auto">
			{filteredEvents.map((month, index) => (
				<div key={index}>
					<div className='bg-L-gray-200 dark:bg-D-gray-200 flex py-3 px-7 text-L-gray-600 dark:text-D-gray-600'>{yearMonthsName[index]}</div>
					<div>
						<div className='p-4 border border-L-gray-200 dark:border-D-gray-200 text-xs flex flex-wrap items-center text-L-gray-700 dark:text-D-gray-700'>
							{
								month.map((card : any) => (
									<CardEvent data={card} key={card.id} />
								))
							}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default TableYearList;