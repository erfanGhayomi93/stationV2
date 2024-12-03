import { CustomCellRendererProps } from '@ag-grid-community/react';
import { RocketIcon, DraftOutlineIcon, DeleteOutlineIcon } from '@assets/icons';

interface ActionRendererParams extends CustomCellRendererProps<IDetailsCartRes> {
     onSendOrder: (data: IDetailsCartRes | undefined) => void;
     onDeleteOrder: (data: IDetailsCartRes | undefined) => void;
     onEditOrder: (data: IDetailsCartRes | undefined) => void;
     ordersLoading: boolean;
}

const ActionRenderer = ({ data, onSendOrder, onEditOrder, onDeleteOrder, ordersLoading }: ActionRendererParams) => {
     return (
          <div className="flex h-full items-center justify-center gap-4">
               <button
                    className="disabled:opacity-60"
                    onClick={() => onSendOrder(data)}
                    disabled={ordersLoading}
               >
                    <RocketIcon className="text-icon-default" />
               </button>
               <button onClick={() => onEditOrder(data)}>
                    <DraftOutlineIcon className="text-icon-default" />
               </button>
               <button onClick={() => onDeleteOrder(data)}>
                    <DeleteOutlineIcon className="text-icon-default" />
               </button>
          </div>
     );
};

export default ActionRenderer;
