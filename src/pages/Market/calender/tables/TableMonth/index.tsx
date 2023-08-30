import dayjs from 'dayjs';
import TableMonthGrid from './TableMonthGrid';
import TableMonthList from './TableMonthList';

type TableMonthType = {
	date: dayjs.Dayjs | null;
	isMeetingFiltered: boolean;
	isProfitPaymentFiltered: boolean;
	isAllSelected: boolean,
	activeLayoutTab: string,
	watchlistId?: number
};

const TableMonth = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, activeLayoutTab, watchlistId }: TableMonthType) => {

	return (
		<>
			{activeLayoutTab === 'list' ? (
				<TableMonthList {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, watchlistId }} />
			) : (
				<TableMonthGrid {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, watchlistId }} />
			)}
		</>
	);
};

export default TableMonth;