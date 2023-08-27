// import { useGetEventQuery } from 'api/queries/getEventQueries';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import MonthDatePicker from './MonthDatePicker';

type TableYearGridType = {
	date: dayjs.Dayjs | null,
	isMeetingFiltered: boolean;
	isProfitPaymentFiltered: boolean;
	isAllSelected: boolean
}


const TableYearGrid = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }: TableYearGridType) => {
	const thisYear = useMemo(() => (dayjs(date).year()), [date]); // get the current year
	const allMonths = useMemo(() => (Array.from({ length: 12 }, (_, index) => dayjs().calendar('jalali').year(thisYear).month(index))), [date]);

	// const { data: dataInYear } = useGetEventQuery([
	// 	"getEventWeekOnCalender", {
	// 		fromDate: allMonths[0].startOf("month")?.calendar("gregory").format("YYYY-MM-DDT00:00:00.000"),
	// 		toDate: allMonths[11].endOf("month")?.calendar("gregory").format("YYYY-MM-DDT23:59:59.000"),
	// 		forUser: isAllSelected
	// 	}
	// ]);

	const dataInYear : any = {result : []}


	const filteredDataFromMonth = useMemo(() => {
		const res: { [key: string]: GetEventType[] } = {
			"1": [],
			"2": [],
			"3": [],
			"4": [],
			"5": [],
			"6": [],
			"7": [],
			"8": [],
			"9": [],
			"10": [],
			"11": [],
			"12": [],
		};

		dataInYear?.result.forEach((item  :any) => {
			const monthKey = dayjs(item.date).calendar("jalali").format("M");
			/* top filter */
			if (!isMeetingFiltered && item.type === "Meeting") return;
			if (!isProfitPaymentFiltered && item.type === "InterestPayment") return;
			res[monthKey].push(item);
		});

		return res;
	}, [dataInYear, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected]);



	return (
		<div className='overflow-auto'>
			<div className='grid grid-cols-4 grid-rows-3 gap-4 overflow-auto'>
				{
					allMonths.map((month, ind) => (
						<div key={ind} className="mx-auto ">
							<MonthDatePicker month={month} filteredDataFromMonth={filteredDataFromMonth[ind + 1]} />
						</div>
					))
				}
			</div>
		</div>
	);
};

export default TableYearGrid;