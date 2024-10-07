import { UpFillArrowIcon } from '@assets/icons';
import { sepNumbers } from '@methods/helper';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export interface ILastPriceTitleProps {
     symbolTitle: string;
     price: number;
     PriceVar: number;
     onClick?: (symbolISIN: string) => void;
     isSelected: boolean;
     symbolISIN: string;
     lastPrice: number;
     lastPriceVar: number;
}

const LastPriceTitle: FC<ILastPriceTitleProps> = ({ price, symbolTitle, PriceVar, onClick, isSelected, symbolISIN }) => {
     const { t } = useTranslation();

     return (
          <button
               className={clsx('rtl flex h-full select-none items-center gap-x-1', styles.container)}
               onClick={() => onClick?.(symbolISIN)}
          >
               <div className="flex items-center gap-x-1 text-xs">
                    <span
                         className={clsx({
                              'text-content-paragraph': !isSelected,
                              'font-medium text-content-title': isSelected,
                         })}
                    >
                         {symbolTitle}
                    </span>

                    <span
                         className={clsx({
                              'text-content-paragraph': !isSelected,
                              'font-medium text-content-title': isSelected,
                         })}
                    >
                         {sepNumbers(price)}
                    </span>

                    <span
                         className={clsx({
                              'text-content-paragraph': !isSelected,
                              'font-medium text-content-title': isSelected,
                         })}
                    >
                         {t('common.rial')}
                    </span>
               </div>

               <div className="flex items-center gap-x-0.5 text-xs">
                    <span
                         className={clsx('ltr', {
                              'text-content-success-buy': PriceVar > 0,
                              'text-content-error-sell': PriceVar < 0,
                         })}
                    >
                         {PriceVar}%
                    </span>

                    <UpFillArrowIcon
                         className={clsx({
                              'text-content-success-buy': PriceVar > 0,
                              'rotate-180 text-content-error-sell': PriceVar < 0,
                         })}
                    />
               </div>
          </button>
     );
};

export default LastPriceTitle;
