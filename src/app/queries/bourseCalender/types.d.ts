interface IGetEventParamsType {
    fromDate?: string;
    toDate?: string;
    watchlistId?: number;
}

interface IGetEventType {
	id: number;
	title: string;
	description: string;
	date: string;
	symbolName: string;
	symbolISIN: string;
	type: 'Meeting' | 'InterestPayment';
}