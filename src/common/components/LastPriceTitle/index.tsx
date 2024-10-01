import { FC } from "react"
import { UpFillArrowIcon } from "@assets/icons"
import { sepNumbers } from "@methods/helper"
import clsx from "clsx"
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";

export interface ILastPriceTitleProps {
    symbolTitle: string,
    lastPrice: number,
    lastPriceVar: number,
    onClick?: (symbolISIN: string) => void,
    isSelected: boolean,
    symbolISIN: string
}

const LastPriceTitle: FC<ILastPriceTitleProps> = ({ lastPrice, symbolTitle, lastPriceVar, onClick, isSelected, symbolISIN }) => {

    const { t } = useTranslation();

    return (
        <div
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
                    {sepNumbers(lastPrice)}
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
                        "text-content-success-buy": lastPriceVar > 0,
                        "text-content-error-sell": lastPriceVar < 0,
                    })}
                >
                    {lastPriceVar}
                    %
                </span>


                <UpFillArrowIcon
                    className={clsx({
                        "text-content-success-buy": lastPriceVar > 0,
                        "text-content-error-sell rotate-180": lastPriceVar < 0,
                    })}
                />
            </div>

        </div >
    )
}

export default LastPriceTitle