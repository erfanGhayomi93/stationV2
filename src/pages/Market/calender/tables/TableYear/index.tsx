import dayjs from 'dayjs';
import TableYearGrid from './TableYearGrid';
import TableYearList from './TableYearList';

type TableMonthProps = {
	date: dayjs.Dayjs | null,
	isMeetingFiltered: boolean;
	isProfitPaymentFiltered: boolean;
	isAllSelected: boolean ,
	activeLayoutTab : string
}

const TableYear = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected ,activeLayoutTab }: TableMonthProps) => {


	return (
		<>
			{activeLayoutTab === 'list' ? (
				<TableYearList {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }} />
			) : (
				<TableYearGrid {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }} />
			)}
		</>
	);
};

export default TableYear;