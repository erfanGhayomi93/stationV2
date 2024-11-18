import { CustomCellRendererProps } from '@ag-grid-community/react';
import { ArrowLeftIcon, DeleteIcon, MoreStatusIcon, PieChartIcon, PlusFillIcon, StartIcon } from '@assets/icons';
import Popup from '@components/popup';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const ActionRenderer = (params: CustomCellRendererProps<ICustomerAdvancedSearchRes>) => {
     const { t } = useTranslation();

     const MORE_ACTION_ITEMS = useMemo(
          () => [
               {
                    id: 'displayPortfolio',
                    label: t('customersManage.displayPortfolioActionItem'),
                    icon: <PieChartIcon />,
               },
               {
                    id: 'addToGroup',
                    label: t('customersManage.addToGroupActionItem'),
                    icon: <PlusFillIcon />,
               },
               {
                    id: 'deleteFromGroup',
                    label: t('customersManage.deleteFromGroupActionItem'),
                    icon: <DeleteIcon />,
               },
          ],
          []
     );

     return (
          <div className="flex h-full items-center justify-center gap-4">
               <button
                    className={clsx({
                         'text-icon-default': !params.data?.isFavorite,
                         'text-icon-warning': params.data?.isFavorite,
                    })}
               >
                    <StartIcon />
               </button>
               <Popup
                    margin={{
                         x: -20,
                    }}
                    defaultPopupWidth={204}
                    renderer={({ setOpen }) => (
                         <ul className="rtl flex flex-col gap-2 rounded-md bg-back-surface p-4 shadow-E5">
                              {MORE_ACTION_ITEMS.map(({ id, icon, label }) => (
                                   <li
                                        className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-back-primary"
                                        key={id}
                                   >
                                        <div className="flex items-center gap-2">
                                             <span className="text-icon-default">{icon}</span>
                                             <span className="text-sm text-content-paragraph">{label}</span>
                                        </div>
                                        <ArrowLeftIcon />
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
