import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import classes from "../../../Calender.module.scss";
import { useMemo } from 'react';
import CardEvent from '../../../components/CardEvent';
import { weekDaysName } from 'src/constant/datepicker';



type MonthDatePickerProps = {
	month: dayjs.Dayjs | null;
	filteredDataFromMonth: GetEventType[];
}

type DayType = {
	enable: boolean;
	weekInMonth: number | null;
	year: string | number;
	month: string | number | null;
	id: number;
	holiday: boolean;
	date: string | number | null;
};

const MonthDatePicker = ({ month, filteredDataFromMonth }: MonthDatePickerProps) => {

	const daysInMonth = useMemo(() => {
		type WeekType = DayType[];
		const weeks: [WeekType, WeekType, WeekType, WeekType, WeekType, WeekType] = [
			Array(7),
			Array(7),
			Array(7),
			Array(7),
			Array(7),
			Array(7)
		];

		const d = month?.calendar('jalali').date(1) as dayjs.Dayjs;

		const daysInMonth = (month?.calendar('jalali').daysInMonth() as number);

		const firstDayOfMonth = month?.startOf('month');

		let firstDayOfMonthWeekday = (firstDayOfMonth?.day() as number);
		firstDayOfMonthWeekday = (firstDayOfMonthWeekday + 1) % 7;

		const currentDate = d.format('YYYY/MM').split('/');


		for (let i = 0; i < daysInMonth + firstDayOfMonthWeekday; i++) {
			const weekNumber = Math.floor(i / 7);
			const weekday = i % 7;
			const isEnable = i >= firstDayOfMonthWeekday;

			const day = {
				enable: isEnable,
				weekInMonth: isEnable ? weekNumber : null,
				year: currentDate[0],
				month: isEnable ? currentDate[1] : null,
				holiday: !((i + 1) % 7),
				id: i,
				date: isEnable ? i - firstDayOfMonthWeekday + 1 : null,
			};

			weeks[weekNumber][weekday] = day;
		}


		return weeks;
	}, [month]);

	const EventListInThisMonth = useMemo(() => {
		const days: string[] = [];
		let currentDate = month?.startOf("month");

		while (currentDate?.isBefore(month?.endOf("month")) || currentDate?.isSame(month?.endOf("month"))) {
			days.push(currentDate.format("D"));
			currentDate = currentDate.add(1, 'day');
		}

		const result = days.reduce((acc, day) => {
			acc[day] = [];
			return acc;
		}, {} as { [key: string]: GetEventType[] });


		filteredDataFromMonth.forEach(item => {
			const date = dayjs(item.date).calendar("jalali");
			const d = date.format("D");

			if (d) result[d].push(item);
		});

		return result;

	}, [month, filteredDataFromMonth]);


	return (
		<div className='flex flex-col gap-1'>
			<div className='flex justify-start items-center gap-9'>
				<div className='bg-L-gray-100 dark:bg-D-gray-100 p-2 text-base font-bold text-L-info-100 dark:text-D-info-100 rounded-lg'>
					{month?.locale('fa').format("MMMM")}
				</div>
			</div>
			<div className='flex flex-col mr-2'>
				<div className='grid grid-cols-7 grid-rows-1 gap-2'>
					{weekDaysName.map((weekDayName, index) => (
						<div style={{ fontSize: "13px" }} className='text-center p-0.5 font-bold text-L-gray-700 dark:text-D-gray-700' key={index}>{weekDayName}</div>
					))}
				</div>

				<div className='grid grid-cols-7 grid-rows-6 gap-x-3 gap-y-0'>
					{
						daysInMonth.map((row, index1) => (
							row.map((column, index2) => {
								const date = column?.date;
								const events = date ? EventListInThisMonth[date] : [];
								const hasEvents = events.length > 0;
								const hasInterestPayment = date ? events.some(item => item.type === "InterestPayment") : false;
								const hasMeeting = date ? events.some(item => item.type === "Meeting") : false;

								return (
									<div key={`${index1}-${index2}`}>
										<Tippy
											className={`bg-L-basic dark:bg-D-basic border border-L-gray-200 dark:border-D-gray-200 rounded-lg ${classes.content}`}
											interactive={true}
											placement="auto"
											content={
												hasEvents ? (
													<div className={`overflow-y-auto overflow-x-hidden max-h-[300px] ${classes.tooltip}`}>
														{events.map(item => (
															<CardEvent data={item} key={item.id} />
														))}
													</div>
												) : null
											}
											disabled={!hasEvents}
										>
											<div className='text-center py-0.5'>
												<span
													className={clsx(
														"w-6 h-6 text-sm p-4 rounded-full flex justify-center items-center font-medium ltr font-IRANSansFaNum text-L-gray-700 dark:text-D-gray-700",
														{
															"bg-gradient-to-r bg-opacity-100 from-L-success-100 dark:from-D-success-100 to-L-info-100 dark:to-D-info-100 font-semibold": hasInterestPayment && hasMeeting,
															"bg-L-success-100 dark:bg-D-success-100 font-semibold": hasInterestPayment,
															"bg-L-info-50 dark:bg-D-info-100 font-semibold": hasMeeting,
														}
													)}
												>
													{date}
												</span>
											</div>
										</Tippy>
									</div>
								);
							})
						))
					}
				</div>
			</div>
		</div>
	);
};

export default MonthDatePicker;