interface IMarketDepthTypes {
    bids: {
        data: any,
        totalQuantity: number
    };
    asks: {
        data: any,
        totalQuantity: number
    };
    isLoading: boolean;
}