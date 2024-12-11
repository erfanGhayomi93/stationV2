import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { UnOrderedListIcon, ExcelExportIcon, FilterOpenIcon } from '@assets/icons';
import Tippy from '@tippyjs/react';

const TradesReportsToolbar = () => {
     const { t } = useTranslation();

     const TOOLBAR_ITEMS = useMemo(
          () => [
               {
                    id: 'manageColumn',
                    icon: <UnOrderedListIcon />,
                    tooltipTitle: t('tradesReports.manageColumnTooltip'),
                    onClick: () => null,
               },
               {
                    id: 'exportExcel',
                    icon: <ExcelExportIcon />,
                    tooltipTitle: t('tradesReports.exportExcelTooltip'),
                    onClick: () => null,
               },
          ],
          []
     );

     return (
          <ul className="flex gap-x-2">
               {TOOLBAR_ITEMS.map(item => (
                    <li
                         key={item.id}
                         className="justify-centerTOOLBAR_ITEMSv flex items-center rounded-lg bg-button-tab-deactive p-2"
                    >
                         <Tippy content={item.tooltipTitle}>
                              <span className="text-icon-default">{item.icon}</span>
                         </Tippy>
                    </li>
               ))}
          </ul>
     );
};

export default TradesReportsToolbar;
