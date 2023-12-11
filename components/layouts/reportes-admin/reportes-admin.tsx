import * as React from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { Grid } from '@mui/material';


const ReportesAdmin = ({ columns, rows }: any) => {
  console.log('columns', columns)
  console.log('rows', rows)

  return (
    <Grid style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
    </Grid>
  );
}

export default ReportesAdmin;