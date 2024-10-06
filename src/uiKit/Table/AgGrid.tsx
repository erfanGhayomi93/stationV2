import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridEvent, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { LicenseManager } from '@ag-grid-enterprise/core';
import useDarkMode from '@hooks/useDarkMode';
import { getHeightsForTables } from '@methods/helper';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

LicenseManager.setLicenseKey(import.meta.env.APP_AG_GRID_LICENSE_KEY);

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type AgGridTableProps<T = unknown> = AgGridReactProps<T> & {
     tableTheme?: 'alpine' | 'balham';
     loading?: boolean;
     tableHeight?: string;
};

const AgGridTable = forwardRef<AgGridReact, AgGridTableProps>(
     ({ defaultColDef, loading, tableHeight, rowData = [], tableTheme = 'alpine', ...props }, ref) => {
          const { rowHeight, headerHeight } = useMemo(() => getHeightsForTables(), []);

          const fitColumnsSize = ({ api }: AgGridEvent<unknown>) => {
               api.sizeColumnsToFit();
          };

          const isDarkMode = useDarkMode();

          console.log(isDarkMode, 'isDarkMode');

          return (
               <div
                    className={clsx('app-ag-table w-full', isDarkMode ? `ag-theme-${tableTheme}-dark` : `ag-theme-${tableTheme}`)}
                    style={{
                         height: tableHeight ?? '100%',
                    }}
               >
                    <AgGridReact
                         rowModelType="clientSide"
                         onFirstDataRendered={fitColumnsSize}
                         rowHeight={rowHeight}
                         headerHeight={headerHeight}
                         ref={ref}
                         rowData={rowData ?? []}
                         rowBuffer={5}
                         enableRtl
                         defaultColDef={{
                              flex: 1,
                         }}
                         {...props}
                    />
               </div>
          );
     }
);

export default AgGridTable;
