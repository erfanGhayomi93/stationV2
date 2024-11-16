import { ClockIcon } from "@assets/icons";
import { dateFormatter } from "@methods/helper";
import clsx from "clsx";
import { Dayjs } from "dayjs";
import { FC } from "react";


interface IBasketHeader {
    name: string;
    date: string;
    isSelected?: boolean;
    clickBasket: () => void;
}
const BasketHeader: FC<IBasketHeader> = ({ date, name, isSelected, clickBasket }) => {
    return (
        <div className={clsx('p-2 flex items-center  rounded-2xl gap-x-2 select-none cursor-pointer', {
            "bg-button-tab-deactive text-content-deselecttab": !isSelected,
            "bg-button-tab-active text-content-selected": isSelected
        })}
            onClick={clickBasket}
        >
            <span className="font-bold">{name}</span>
            <span>{dateFormatter(date, 'datetime')}</span>
            <ClockIcon />
        </div>
    )
}

export default BasketHeader