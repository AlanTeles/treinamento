import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

import formatDate from './../../utils/formatDate';

import { ComponentChartProps, LegendProps, FunctionChartDataParams } from "./../../_types";

import COLORS from "./../../assets/json/colors.json";
export default function Chart(props: ComponentChartProps){
	function generateLinearGradientArea(value: LegendProps, index: number){
		const color = value.color || COLORS[index];
		return (
			<linearGradient
				key={`linear-gradient-${color}`}
				id={`linear-gradient-${color}`}
				x1={0} y1={0} x2={0} y2={1}
			>
				<stop offset="25%" stopColor={color} />
				<stop offset="95%" stopColor={color} stopOpacity={0} />
			</linearGradient>
		)
	}
    function getChartData({ item, data, key2XAxis }: FunctionChartDataParams) {
		const { key, alias } = item;
        return data.map(telemetry => {
			return {
				"_id": telemetry[key2XAxis],
				[alias || key]: telemetry[key]
			}
		});
    }
	
    return (
		<ResponsiveContainer width={ props.width } height={ props.height }>
			<AreaChart data={getChartData(props)} margin={{ top: 0, right: 0 }}>
				<defs>{props.legend.map(generateLinearGradientArea)}</defs>

				<CartesianGrid strokeDasharray="3" vertical={false} />

				<XAxis dataKey="_id" tickFormatter={dt => formatDate(new Date(dt), "HH:mm")} />
				<YAxis />

				<Tooltip contentStyle={{color: "black"}} labelFormatter={value => formatDate(new Date(value))}/>
				{props.legend.map((value, index) => (
					<Area
						key={`area-linear-${value.key}`}
						type="basis"
						dataKey={ value.alias || value.key }
						stroke={ value?.color || COLORS[index] }
						fill={`url(#linear-gradient-${value.color || COLORS[index]})`}
					/>
				))}
			</AreaChart>
		</ResponsiveContainer>
    );
}