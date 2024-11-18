import { CustomCellRendererProps } from '@ag-grid-community/react';
import { StartIcon } from '@assets/icons';

const TitleRenderer = ({ data }: CustomCellRendererProps<IMyGroupsInformationRes>) => {
     const isFavoriteCustomer = data?.id === -1;

     return (
          <div className="flex items-center justify-center gap-2 text-icon-default">
               {isFavoriteCustomer && <StartIcon className="text-icon-warning" />}
               <span>{data?.groupName}</span>
          </div>
     );
};

export default TitleRenderer;
