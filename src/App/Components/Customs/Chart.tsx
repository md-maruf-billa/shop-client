import {
      BarChart,
      Bar,
      Rectangle,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
      ResponsiveContainer,
} from "recharts";

const data = [
      { name: "02 Mar 2025", Orders: 4000, Canceled: 2400, amt: 2400 },
      { name: "03 Mar 2025", Orders: 3000, Canceled: 1398, amt: 2210 },
      { name: "04 Mar 2025", Orders: 2000, Canceled: 9800, amt: 2290 },
      { name: "05 Mar 2025", Orders: 2780, Canceled: 3908, amt: 2000 },
      { name: "06 Mar 2025", Orders: 1890, Canceled: 4800, amt: 2181 },
      { name: "07 Mar 2025", Orders: 2390, Canceled: 3800, amt: 2500 },
      { name: "08 Mar 2025", Orders: 3490, Canceled: 4300, amt: 2100 },
];

const Chart = () => {
      return (
            <ResponsiveContainer width="100%" height={500}>
                  <BarChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                              dataKey="Orders"
                              fill="#8884d8"
                              activeBar={<Rectangle fill="pink" stroke="blue" />}
                        />
                        <Bar
                              dataKey="Canceled"
                              fill="#82ca9d"
                              activeBar={<Rectangle fill="gold" stroke="purple" />}
                        />
                  </BarChart>
            </ResponsiveContainer>
      );
};

export default Chart;
