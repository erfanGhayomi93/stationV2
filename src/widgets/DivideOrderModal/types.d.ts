interface DividedOrderRowType {
    id: string;
    customerTitle: string;
    customerISIN: string;
	quantity: number;
	price: number;
	status?: 'PENDING' | 'SUCCEEDED' | 'Error';
    clientKey?: string;
}