import LayoutGeneral from 'components/layouts/layout-general'
import ReporteLanging from 'components/layouts/reporte-landing/reporte-landing'
import ReportesAdmin from 'components/layouts/reportes-admin/reportes-admin'

import * as XLSX from 'xlsx';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import { Button, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import LandingTitles from 'components/layouts/ui/landing-titles';

import type { GetServerSideProps, NextPage } from 'next'
import { getProyectos } from 'services/proyectos/proyectos.service';
import { ProyectoFinal, Proyectos } from 'interfaces/proyect.type';
import { Spinner } from 'components/layouts/ui/spinner';
import ChartCategory from 'components/layouts/ui/ChartCategory';
import ChartMonth from 'components/layouts/ui/ChartMonth';
import { calculateTotalSum, generateChartDataByCategory, processesData } from 'utils/chartsUtils';
import { useEffect, useState } from 'react';




interface Props {
  proyectos: ProyectoFinal[]
  proyectosCargados: boolean
}




const theme = createTheme({
  typography: {
    fontFamily: [
      'sans-serif',
      'Roboto',
    ].join(','),
  },
});

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'titulo',
    headerName: 'Titulo',
    type: "string",
    width: 350,
    editable: true,
  },
  {
    field: 'resumen',
    headerName: 'resumen',
    type: "string",
    width: 500,
    editable: true,
  },
  {
    field: 'montoRecaudado',
    headerName: 'Monto Recaudado',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'monto',
    headerName: 'Monto objetivo',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'fechaFinal',
    headerName: 'Fecha finalizacion',
    width: 160,
    editable: true,
  },
];


const Reportes: NextPage<Props> = ({ proyectos, proyectosCargados }: Props) => {
  const [total, setTotal] = useState<number>(0);
  const [dataSet, setDataSet] = useState<any>();
  const [dataSetCategory, setDataSetCategory] = useState<any>();
  const [filteredEventsSet, setfilteredEventsSet] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false)
  const [filteredProyects, setFilteredProyects] = useState<
    { id: number; titulo: string; resumen: string; monto: number; montoRecaudado: number | undefined; fechaFinal: string; }[]
  >([]);
  if (!proyectosCargados) {
    return (
      <LayoutGeneral>
        <ThemeProvider theme={theme}>
          <Grid sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spinner />
          </Grid>
        </ThemeProvider>
      </LayoutGeneral>
    );
  }


  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredProyects);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Proyectos');
    XLSX.writeFile(workbook, 'reportes.xlsx');
  };


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    try {
      const transformedArray = proyectos.map((item, index) => {
        return {
          id: index + 1,
          titulo: item.nombre,
          resumen: item.descripciones.find(desc => desc.tipo === 1)?.descripcion || '',
          monto: item.monto,
          montoRecaudado: item.montoSumatoriaDonaciones,
          fechaFinal: item.fechaFinalizacion.split(' ')[0]
        };
      });

      setFilteredProyects(transformedArray);
      setfilteredEventsSet(proyectos);
      const valuesChart = processesData(proyectos);
      setDataSet(valuesChart);
      setTotal(Number(calculateTotalSum(valuesChart)));
      setDataSetCategory(generateChartDataByCategory(proyectos));
      setLoaded(true)

    } catch (error) {
      console.log("error");

    }
  }, [proyectos])

  if (!loaded) {
    return (
      <LayoutGeneral>
        <ThemeProvider theme={theme}>
          <Grid sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spinner />
          </Grid>
        </ThemeProvider>
      </LayoutGeneral>
    );
  }

  return (
    <LayoutGeneral>
      <ThemeProvider theme={theme}>
        <Grid sx={{ width: "75vw", display: "flex", flexDirection: "column" }} gap={3}>
          <ReporteLanging total={total} proyectos={proyectos?.length} />
          <LandingTitles smallTitle="Conoce los avances de los proyectos" title="Reportes" color="black" />
          <Grid>
            <Button onClick={exportToExcel} style={{ width: "250px" }} color='primary' variant='contained'><DownloadIcon style={{ marginRight: "5px" }} />Descargar Excel</Button>
          </Grid>
          <Grid container spacing={2} mt={4} mb={4}>
            <Grid item xs={12} sm={6} >

              <ChartCategory dataSetCategory={dataSetCategory} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ChartMonth dataset={dataSet} />
            </Grid>
          </Grid>

          <ReportesAdmin rows={filteredProyects} columns={columns} />
        </Grid>
      </ThemeProvider>
    </LayoutGeneral>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const proyectos = await getProyectos(0, 100);

    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate');

    return {
      props: {
        proyectos: proyectos,
        proyectosCargados: true
      },
    };
  } catch (error) {
    console.error('Error al cargar proyectos', error);
    return {
      props: {
        proyectos: [],
        proyectosCargados: false
      },
    };
  }
};


export default Reportes
