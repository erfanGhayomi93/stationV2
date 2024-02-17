type IIPOOrder = {
    orderSide: 'Buy';
    symbolISIN: string;
    items: 
        {
            customerISIN: string;
            price: number;
            quantity: number;
            validity: 'GoodTillDate' | 'Day';
            validityDate: string;
            orderType: 'MarketOrder';
            orderStrategy: 'Normal';
        }[],
    
};
