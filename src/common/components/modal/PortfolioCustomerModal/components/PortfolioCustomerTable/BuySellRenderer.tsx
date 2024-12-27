import { CustomDetailCellRendererProps } from '@ag-grid-community/react';
import { MinusSquareFillIcon, PlusSquareFillIcon } from '@assets/icons';

interface IBuySellRendererParams extends CustomDetailCellRendererProps<IPortfolioRes> {
     onClickBuy: (data: IPortfolioRes | undefined) => void;
     onClickSell: (data: IPortfolioRes | undefined) => void;
}

const BuySellRenderer = ({ data, onClickBuy, onClickSell }: IBuySellRendererParams) => {
     return (
          <div className="flex h-full items-center justify-center gap-5">
               <button onClick={() => onClickBuy(data)} className="text-icon-default transition-colors hover:text-icon-success disabled:opacity-50" disabled={true}>
                    <PlusSquareFillIcon />
               </button>

               <button onClick={() => onClickSell(data)} className="text-icon-default transition-colors hover:text-icon-error disabled:opacity-50" disabled={true}>
                    <MinusSquareFillIcon />
               </button>
          </div>
     );
};

export default BuySellRenderer;
