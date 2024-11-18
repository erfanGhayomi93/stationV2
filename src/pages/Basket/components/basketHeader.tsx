import { ClockIcon } from "@assets/icons";
import { dateFormatter } from "@methods/helper";
import clsx from "clsx";
import { FC } from "react";


interface IBasketHeader {
    name: string;
    date: string | null;
    isSelected?: boolean;
    id : number
    clickBasket: (id : number) => void;
}
const BasketHeader: FC<IBasketHeader> = ({ date, name, isSelected, clickBasket , id }) => {
    return (
        <button className={clsx('p-2 flex items-center rounded-2xl gap-x-2 select-none cursor-pointer transition-colors', {
            "bg-button-tab-deactive text-content-deselecttab": !isSelected,
            "bg-button-tab-active text-content-selected": isSelected
        })}
            onClick={() => clickBasket(id)}
        >
            <span className="font-bold">{name}</span>
            <span className="whitespace-nowrap ltr">{date && dateFormatter(date, 'datetime')}</span>
            <ClockIcon />
        </button>
    )
}

export default BasketHeader