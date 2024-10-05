import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridEvent, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { LicenseManager } from '@ag-grid-enterprise/core';
import { getHeightsForTables } from '@methods/helper';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

LicenseManager.setLicenseKey('DownloadDevTools_COM_NDEwMjM0NTgwMDAwMA==59158b5225400879a12a96634544f5b6');

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

          return (
               <div
                    className={clsx(`relative w-full ag-theme-${tableTheme}`)}
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
