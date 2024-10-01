import { FC } from "react"
import { UpFillArrowIcon } from "@assets/icons"
import { sepNumbers } from "@methods/helper"
import clsx from "clsx"
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";

export interface ILastPriceTitleProps {
    symbolTitle: string,
    price: number,
    PriceVar: number,
    onClick?: (symbolISIN: string) => void,
    isSelected: boolean,
    symbolISIN: string
}

const LastPriceTitle: FC<ILastPriceTitleProps> = ({ price, symbolTitle, PriceVar, onClick, isSelected, symbolISIN }) => {

    const { t } = useTranslation();

    return (
        <button
            className={clsx('flex items-center h-full gap-x-1 select-none rtl', styles.container)}
            onClick={() => onClick?.(symbolISIN)}
        >
            <div className="flex gap-x-1 items-center text-xs">
                <span
                    className={clsx({
                        "text-content-paragraph": !isSelected,
                        "text-content-title font-medium": isSelected,
                    })}>
                    {symbolTitle}
                </span>

                <span
                    className={clsx({
                        "text-content-paragraph": !isSelected,
                        "text-content-title font-medium": isSelected,
                    })}
                >
                    {sepNumbers(price)}
                </span>

                <span
                    className={clsx({
                        "text-content-paragraph": !isSelected,
                        "text-content-title font-medium": isSelected,
                    })}
                >
                    {t("common.rial")}
                </span>

            </div>

            <div className="flex gap-x-0.5 items-center text-xs">
                <span
                    className={clsx("ltr", {
                        "text-content-success-buy": PriceVar > 0,
                        "text-content-error-sell": PriceVar < 0,
                    })}
                >
                    {PriceVar}
                    %
                </span>


                <UpFillArrowIcon
                    className={clsx({
                        "text-content-success-buy": PriceVar > 0,
                        "text-content-error-sell rotate-180": PriceVar < 0,
                    })}
                />
            </div>

        </button >
    )
}

export default LastPriceTitle