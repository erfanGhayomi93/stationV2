import TableWeekGrid from './TableWeekGrid';
import TableWeekList from './TableWeekList';
import dayjs from 'dayjs';

type TableWeekType = {
	date: dayjs.Dayjs | null,
	isMeetingFiltered: boolean,
	isProfitPaymentFiltered: boolean,
	isAllSelected: boolean,
	activeLayoutTab: string,
	watchlistId?: number
}

const TableWeek = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, activeLayoutTab, watchlistId }: TableWeekType) => {


	return activeLayoutTab === 'list' ? (
		<TableWeekList {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, watchlistId }} />
	) : (
		<TableWeekGrid {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, watchlistId }} />
	);
};

export default TableWeek;