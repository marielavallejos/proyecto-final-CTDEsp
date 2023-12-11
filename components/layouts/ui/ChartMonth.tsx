import * as React from 'react';
import { BarChart } from '@mui/x-charts';

const chartSetting = {
    yAxis: [
        {
            label: 'Pesos',
        },
    ],
    height: 400,
};

interface DatasetEntry {
    month: string;
    [category: string]: number | string;
}

interface BarsDatasetProps {
    dataset: DatasetEntry[];
}

const valueFormatter = (value: number) => `$ ${value}`;

const ChartMonth: React.FC<BarsDatasetProps> = ({ dataset }: BarsDatasetProps) => {
    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month',label:"Meses" }]}
            series={Object.keys(dataset[0])
                .filter((key) => key !== 'month')
                .map((category) => ({
                    dataKey: category,
                    label: category,
                    valueFormatter,
                }))}
            {...chartSetting}
        />
    );
};

export default ChartMonth;