/***************************
 ** CHARTS
 ***************************/
 export type LegendProps = {
	key: string
	color?: string
	type?: string
	alias?: string
}
export type FunctionChartDataParams = {
	data: any[],
	key2XAxis: string,
	item: {
		key:string
		alias: string
	}
}
export interface ComponentChartProps extends FunctionChartDataParams {
	legend: LegendProps[],
	width?: string | number, 
	height?: string | number
}
/***************************
 ** INFLUX
 ***************************/
export type InfluxResponseItem = {
    series: {
        columns: Array<[]>
        name: string
        values: Array<[]>
    }[]
    statement_id: number
}
export type InfluxResponse = {
    results: InfluxResponseItem[]
}
/***************************
 ** API
 ***************************/
export type ApiParams = {
    alias: string,
    params: {},
    accessToken: string | null,
    headers: {},
    time: Date
}
export type BackEndProps = {
    FL_STATUS: boolean
    requestError: boolean
    data?: any
}
/***************************
 ** TELEMETRY
 ***************************/
export type TelemetryProps = {
    bomba1: boolean
    bomba2: boolean
    datetime: string
    float1: string
    float2: string
    humid_limit: number
    led: boolean
    ph: number
    rain: string
    sensorname: string
    sensortype: string
    time: number
    water_spend: number
    watts_spend: number
    humid: number
    lux: number
    soil: number
    temp: number
}
/***************************
 ** INFLUX
 ***************************/
export type influxProps = {
    sensorname: string
    sensortype: string
    time: string
    value: number
}
/***************************
 ** STATUS
 ***************************/
export type LinearProgressWithLabelProps = {
    value: number
    unitmeasurement: string
    barcolor: string
    title: string
    icon: any
}
/***************************
 ** ACTIONS CARD
 ***************************/
 export type ActionCardProps = {
    led: boolean
    bomba1: boolean
    bomba2: boolean
    onChange: (type:"led"|"bomba1"|"bomba2", value:boolean) => void
}
export type ActionProps = {
    children: React.ReactNode
    name: string
    color?: "bg-blue"|"bg-yellow"
}
export type ActionItemProps = {
    tooltip: string
    icon: JSX.Element
    type: "led"|"bomba1"|"bomba2"
    onChange: (type:"led"|"bomba1"|"bomba2", value:boolean) => void
    switchActive: boolean
}