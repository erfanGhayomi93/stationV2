type calenderDateTab = "day" | "week" | "month" | "year";
type calenderLayoutTab = "list" | "grid";

type GetEventType = {
	id: number;
	title: string;
	description: string;
	date: string;
	symbolName: string;
	symbolISIN: string;
	type: 'Meeting' | 'InterestPayment';
}