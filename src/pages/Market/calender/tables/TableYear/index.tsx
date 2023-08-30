import dayjs from 'dayjs';
import TableYearGrid from './TableYearGrid';
import TableYearList from './TableYearList';

type TableMonthProps = {
	date: dayjs.Dayjs | null,
	isMeetingFiltered: boolean;
	isProfitPaymentFiltered: boolean;
	isAllSelected: boolean,
	activeLayoutTab: string,
	watchlistId?: number
}

const TableYear = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, activeLayoutTab, watchlistId }: TableMonthProps) => {


	return (
		<>
			{activeLayoutTab === 'list' ? (
				<TableYearList {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, watchlistId }} />
			) : (
				<TableYearGrid {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, watchlistId }} />
			)}
		</>
	);
};

export default TableYear;