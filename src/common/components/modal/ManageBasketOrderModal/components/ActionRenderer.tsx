import { CustomCellRendererProps } from '@ag-grid-community/react';
import { DeleteOutlineIcon, DraftOutlineIcon } from '@assets/icons';

interface IActionRendererParamsProps extends CustomCellRendererProps<ICartListRes> {
     onDeleteBasket: (data: ICartListRes | undefined) => void;
     onEditBasket: (data: ICartListRes | undefined) => void;
}

const ActionRenderer = ({ data, onDeleteBasket, onEditBasket }: IActionRendererParamsProps) => {
     return (
          <div className="flex h-full items-center justify-center gap-4 text-icon-default">
               <button className="disabled:opacity-60" onClick={() => onEditBasket(data)}>
                    <DraftOutlineIcon />
               </button>
               <button className="disabled:opacity-60" onClick={() => onDeleteBasket(data)}>
                    <DeleteOutlineIcon />
               </button>
          </div>
     );
};

export default ActionRenderer;
