interface DividedOrderRowType {
    id: string;
    customerTitle: string;
    customerISIN: string;
	quantity: number;
	price: number;
	status?: OrderStatusType;
    isError : boolean 
    clientKey?: string;
}