import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridEvent, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { LicenseManager } from '@ag-grid-enterprise/core';
import useDarkMode from '@hooks/useDarkMode';
import { getHeightsForTables } from '@methods/helper';
import clsx from 'clsx';
import { forwardRef, memo, Ref, useMemo } from 'react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

LicenseManager.setLicenseKey(import.meta.env.APP_AG_GRID_LICENSE_KEY);

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
                         modules={[ClientSideRowModelModule]}
                         onFirstDataRendered={fitColumnsSize}
                         containerStyle={
                              loading
                                   ? {
                                          filter: 'blur(2px)',
                                          WebkitFilter: 'blur(2px)',
                                     }
                                   : undefined
                         }
                         rowHeight={rowHeight}
                         headerHeight={headerHeight}
                         ref={ref}
                         rowData={rowData ?? []}
                         rowBuffer={5}
                         enableRtl
                         suppressNoRowsOverlay
                         defaultColDef={{
                              flex: 1,
                         }}
                         {...props}
                    />
               </div>
          );
     }
);

export default memo(AgGridTable) as <TData extends unknown>(
     props: AgGridTableProps<TData> & { ref?: Ref<AgGridReact<TData>> }
) => JSX.Element;
