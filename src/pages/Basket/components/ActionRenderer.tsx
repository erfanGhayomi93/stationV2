import { CustomCellRendererProps } from '@ag-grid-community/react';
import { RocketIcon, DraftOutlineIcon, DeleteOutlineIcon } from '@assets/icons';
import { useTranslation } from 'react-i18next';

interface ActionRendererParams extends CustomCellRendererProps<IDetailsCartRes> {
     onSendOrder: (data: IDetailsCartRes | undefined) => void;
     onDeleteOrder: (data: IDetailsCartRes | undefined) => void;
     onEditOrder: (data: IDetailsCartRes | undefined) => void;
}

const ActionRenderer = ({ data, onSendOrder, onEditOrder, onDeleteOrder }: ActionRendererParams) => {
     return (
          <div className="flex h-full items-center justify-center gap-4">
               <button onClick={() => onSendOrder(data)}>
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
