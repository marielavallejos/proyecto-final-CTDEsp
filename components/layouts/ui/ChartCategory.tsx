import { PieChart } from "@mui/x-charts";

interface ChartCategoryProps {
  dataSetCategory: any[];
}

const ChartCategory: React.FC<ChartCategoryProps> = ({ dataSetCategory }) => {

  return (
    <PieChart
      series={[
        {
          data: dataSetCategory,
        },
      ]}
      height={300}
    />
  );
};

export default ChartCategory;