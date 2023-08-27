import TableWeekGrid from './TableWeekGrid';
import TableWeekList from './TableWeekList';
import dayjs from 'dayjs';

type TableWeekType = {
	date: dayjs.Dayjs | null,
	isMeetingFiltered: boolean,
	isProfitPaymentFiltered: boolean,
	isAllSelected: boolean ,
	activeLayoutTab : string
}

const TableWeek = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected , activeLayoutTab }: TableWeekType) => {


	return activeLayoutTab === 'list' ? (
		<TableWeekList {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }} />
	) : (
		<TableWeekGrid {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }} />
	);
};

export default TableWeek;