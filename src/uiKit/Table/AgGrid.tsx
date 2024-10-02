import React, { forwardRef } from 'react'
import { ModuleRegistry } from "@ag-grid-community/core";
import { LicenseManager } from "@ag-grid-enterprise/core";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import clsx from 'clsx';

LicenseManager.setLicenseKey("DownloadDevTools_COM_NDEwMjM0NTgwMDAwMA==59158b5225400879a12a96634544f5b6");

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type AgGridTableProps<T = unknown> = AgGridReactProps<T> & {
	tableTheme?: 'alpine' | 'balham';
	loading?: boolean;
	tableHeight?: string;
};






const AgGridTable = forwardRef<AgGridReact, AgGridTableProps>(({ defaultColDef, loading, tableHeight, rowData = [], tableTheme = 'alpine', ...props }, ref) => {
	return (
		<div
		className={clsx(`w-full ag-theme-${tableTheme}`)}
			style={{
				height: tableHeight ?? '100vh',
				width: "100%"
			}}
		>
			<AgGridReact
				ref={ref}
				rowData={rowData ?? []}
			

				{...props}
			/>
		</div>
	)
})

export default AgGridTable