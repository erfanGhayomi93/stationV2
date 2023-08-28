interface DividedOrderRowType {
    id: number | string;
    customerTitle: string;
    customerISIN: string;
	quantity: number;
	price: number;
	status: 'PENDING' | 'SUCCEEDED' | 'ERROR' | null;
}