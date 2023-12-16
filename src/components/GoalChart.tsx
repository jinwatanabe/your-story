import { DonutChart } from "@tremor/react";

type Props = {
  chartData: ChartData[];
  label: string;
};

type ChartData = {
  name: string;
  sales: number;
};

const GoalChart = ({ chartData, label }: Props) => (
  <DonutChart
    className="mt-6 mb-4"
    data={chartData}
    category="sales"
    index="name"
    colors={["red", "slate"]}
    label={label}
    showAnimation={true}
    animationDuration={1000}
  />
);

export default GoalChart;
