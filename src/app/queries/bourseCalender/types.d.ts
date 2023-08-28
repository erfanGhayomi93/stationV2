interface IGetEventParamsType {
    fromDate?: string;
    toDate?: string;
    forUser: boolean;
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