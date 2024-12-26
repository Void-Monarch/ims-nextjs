"use client";
import React, { useEffect, useMemo, useState } from "react";

import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import {
  AllCommunityModule,
  iconSetMaterial,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import MainLoader from "../Loaders/MainLoader";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection: RowSelectionOptions = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const GridExample = () => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rowData, setRowData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Active",
      field: "active",
      sortable: true,
      filter: true,
      filterParams: {
        values: ["true", "false"],
      },
    },
    {
      headerName: "Role",
      field: "role",
      sortable: true,
      filter: true,
      filterParams: {
        values: ["admin", "level_0", "level_1", "level_2", "level_3"],
      },
    },
    {
      headerName: "Created At",
      field: "createdAt",
      sortable: true,
      filter: true,
    },
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      if (!res.ok) {
        setIsLoadingData(false);
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      setRowData(data);
      setIsLoadingData(false);
    };

    fetchUsers();
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  const myTheme = themeQuartz.withPart(iconSetMaterial).withParams({
    accentColor: "#FCD34D",
    backgroundColor: "#FFFFFF",
    borderColor: "#ffffff00",
    borderRadius: 20,
    browserColorScheme: "inherit",
    cellHorizontalPaddingScale: 1,
    chromeBackgroundColor: "#FFFFFF",
    columnBorder: true,
    filterToolPanelGroupIndent: 8,
    fontFamily: {
      googleFont: "Roboto",
    },
    fontSize: 14,
    foregroundColor: "#000000",
    headerBackgroundColor: "#fcd34d",
    headerFontSize: 16,
    headerFontWeight: 400,
    headerTextColor: "#000000",
    headerVerticalPaddingScale: 0.9,
    iconSize: 20,
    inputBorder: true,
    oddRowBackgroundColor: "#FDE68A",
    rowBorder: true,
    rowVerticalPaddingScale: 1,
    sidePanelBorder: false,
    spacing: 8,
    wrapperBorder: false,
    wrapperBorderRadius: 8,
  });

  return (
    <div style={{ height: 600, width: 1050 }}>
      <AgGridReact
        theme={myTheme}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        loading={isLoadingData}
        loadingOverlayComponent={MainLoader}
      />
    </div>
  );
};
