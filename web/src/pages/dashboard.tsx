import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Interesado", value: 20 },
  { name: "No interesado", value: 30 },
  { name: "No contactados", value: 40 },
  // { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const total = data.reduce((acc, curr) => acc + curr.value, 0);
export default class Dashboard extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o";

  render() {
    return (
      <>
        <div className="mt-10 flex">
          <ul className="mx-auto  flex  items-center">
            <li className="mx-2 flex rounded-lg border font-bold ">
              <span className="rounded-l-md px-6 py-4 text-white ">Total</span>
              <span className="rounded-r-md bg-white p-4">{total}</span>
            </li>
            {data.map((item, index) => (
              <li
                key={index}
                className="mx-2 flex rounded-lg border font-bold  "
              >
                <span
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  className="rounded-l-md  px-6 py-4 text-white "
                >
                  {item.name}
                </span>
                <span className="rounded-r-md bg-white p-4 ">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
          {/* <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie> */}
          <Pie
            data={data}
            cx={420}
            cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </>
    );
  }
}
export { Dashboard };
