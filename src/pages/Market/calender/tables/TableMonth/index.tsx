import dayjs from 'dayjs';
import TableMonthGrid from './TableMonthGrid';
import TableMonthList from './TableMonthList';

type TableMonthType = {
	date: dayjs.Dayjs | null;
	isMeetingFiltered: boolean;
	isProfitPaymentFiltered: boolean;
	isAllSelected: boolean , 
	activeLayoutTab : string
};

const TableMonth = ({ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected , activeLayoutTab }: TableMonthType) => {

	return (
		<>
			{activeLayoutTab === 'list' ? (
				<TableMonthList {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }} />
			) : (
				<TableMonthGrid {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected }} />
			)}
		</>
	);
};

export default TableMonth;