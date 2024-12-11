import { CustomCellRendererProps } from '@ag-grid-community/react';
import { DeleteOutlineIcon, DraftOutlineIcon, XCircleOutlineIcon } from '@assets/icons';

interface IActionRendererParamsProps extends CustomCellRendererProps<ICartListRes> {
     onDeleteBasket: (data: ICartListRes | undefined) => void;
     onEditBasket: (data: ICartListRes | undefined) => void;
     onAddBasket: (data: ICartListRes | undefined) => void;
     isAdd?: boolean;
     loadingCreate: boolean
}

const ActionRenderer = ({ data, onDeleteBasket, onEditBasket, onAddBasket, isAdd, loadingCreate }: IActionRendererParamsProps) => {

     return (
          <div className="flex h-full items-center justify-center gap-4 text-icon-default">
               {
                    !isAdd && (
                         <>
                              <button className="disabled:opacity-60" onClick={() => onEditBasket(data)}>
                                   <DraftOutlineIcon />
                              </button>
                              <button className="disabled:opacity-60" onClick={() => onDeleteBasket(data)}>
                                   <DeleteOutlineIcon />
                              </button>
                         </>
                    )
               }

               {isAdd && (
                    <button
                         className="disabled:opacity-60"
                         onClick={() => onAddBasket(data)}
                         disabled={loadingCreate}
                    >
                         <XCircleOutlineIcon className='rotate-45' />
                    </button>
               )}
          </div>
     );
};

export default ActionRenderer;
