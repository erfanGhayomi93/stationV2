import CustomersSearch from "@components/customersSearch"



const BodyBuySell = () => {
    return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex gap-x-1 items-center">
                <span>مشتری:</span>
                <div className="flex-1">
                    <CustomersSearch />
                </div>
            </div>
            <div>price</div>
            <div>credit</div>
            <div>number</div>
            <div>graunty</div>
        </div>
    )
}

export default BodyBuySell