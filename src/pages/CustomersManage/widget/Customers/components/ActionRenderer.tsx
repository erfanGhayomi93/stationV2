import { CustomCellRendererProps } from '@ag-grid-community/react';
import { ArrowLeftIcon, MoreStatusIcon, PieChartIcon, PlusFillIcon } from '@assets/icons';
import Popup from '@components/popup';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionRendererParams extends CustomCellRendererProps<ICustomerAdvancedSearchRes> {
     onPortfolioCustomer: (data: ICustomerAdvancedSearchRes | undefined) => void;
     onAddCustomerToGroups: (data: ICustomerAdvancedSearchRes | undefined) => void;
}

const ActionRenderer = ({ data, onPortfolioCustomer, onAddCustomerToGroups }: ActionRendererParams) => {
     const { t } = useTranslation();

     const MORE_ACTION_ITEMS = useMemo(
          () => [
               {
                    id: 'displayPortfolio',
                    label: t('customersManage.displayPortfolioActionItem'),
                    icon: <PieChartIcon />,
                    onClick: onPortfolioCustomer,
               },
               {
                    id: 'addToGroup',
                    label: t('customersManage.addToGroupActionItem'),
                    icon: <PlusFillIcon />,
                    onClick: onAddCustomerToGroups,
               },
               //    {
               //         id: 'deleteFromGroup',
               //         label: t('customersManage.deleteFromGroupActionItem'),
               //         icon: <DeleteIcon />,
               //    },
          ],
          []
     );

     return (
          <div className="flex h-full items-center justify-center gap-4">
               {/* <button
                    className={clsx({
                         'text-icon-default': !params.data?.isFavorite,
                         'text-icon-warning': params.data?.isFavorite,
                    })}
               >
                    <StartIcon />
               </button> */}
               <Popup
                    margin={{
                         x: -20,
                    }}
                    defaultPopupWidth={204}
                    renderer={({ setOpen }) => (
                         <ul className="rtl flex flex-col gap-2 rounded-md bg-back-surface p-4 shadow-E5">
                              {MORE_ACTION_ITEMS.map(({ id, icon, label, onClick }) => (
                                   <li
                                        className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-back-primary"
                                        key={id}
                                        onClick={() => onClick?.(data)}
                                   >
                                        <div className="flex items-center gap-2">
                                             <span className="text-icon-default">{icon}</span>
                                             <span className="text-sm text-content-paragraph">{label}</span>
                                        </div>
                                        <ArrowLeftIcon className="text-icon-default" />
                                   </li>
                              ))}
                         </ul>
                    )}
               >
                    {({ open, setOpen }) => (
                         <button
                              onClick={() => {
                                   setOpen(!open);
                              }}
                         >
                              <MoreStatusIcon />
                         </button>
                    )}
               </Popup>
          </div>
     );
};

export default ActionRenderer;
