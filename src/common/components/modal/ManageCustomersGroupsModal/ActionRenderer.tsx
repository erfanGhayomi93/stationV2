import { CustomCellRendererProps } from '@ag-grid-community/react';
import { DeleteOutlineIcon, DraftOutlineIcon } from '@assets/icons';

interface IActionRendererParamsProps extends CustomCellRendererProps<IMyGroupsInformationRes> {
     onDeleteGroup: (data: IMyGroupsInformationRes | undefined) => void;
     onEditGroup: (data: IMyGroupsInformationRes | undefined) => void;
}

const ActionRenderer = ({ data, onDeleteGroup, onEditGroup }: IActionRendererParamsProps) => {
     const isFavoriteCustomer = data?.id === -1;

     return (
          <div className="flex h-full items-center justify-center gap-4 text-icon-default">
               <button className="disabled:opacity-60" disabled={isFavoriteCustomer} onClick={() => onEditGroup(data)}>
                    <DraftOutlineIcon />
               </button>
               <button className="disabled:opacity-60" disabled={isFavoriteCustomer} onClick={() => onDeleteGroup(data)}>
                    <DeleteOutlineIcon />
               </button>
          </div>
     );
};

export default ActionRenderer;
