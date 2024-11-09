import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IOrderBookHeaderProps {
     side: TSide;
}

const OrderBookHeader: FC<IOrderBookHeaderProps> = ({ side }) => {
     const { t } = useTranslation();

     return (
          <div
               className={clsx('flex w-full justify-between rounded-md p-2 text-xs', {
                    'bg-back-green text-content-success-buy': side === 'Buy',
                    'flex-row-reverse bg-back-red text-content-error-sell': side === 'Sell',
               })}
          >
               <span
                    className={clsx('w-1/3', {
                         'text-right': side === 'Buy',
                         'text-left': side === 'Sell',
                    })}
               >
                    {t('orderBook.countHeader')}
               </span>
               <span className="w-1/3 text-center">{t('orderBook.volumeHeader')}</span>
               <span
                    className={clsx('w-1/3', {
                         'text-left': side === 'Buy',
                         'text-right': side === 'Sell',
                    })}
               >
                    {t('orderBook.priceHeader')}
               </span>
          </div>
     );
};

export default OrderBookHeader;
