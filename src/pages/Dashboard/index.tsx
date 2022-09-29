import { useState, useCallback, useEffect } from "react";
import { Container, Grid, Tooltip } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useLoading } from "../../Context/LoadingContext";
import { toast } from "react-toastify";

import api from "../../_api/api";
import InfluxDB from "../../_api/InfluxDB";
import { influxProps, TelemetryProps } from "../../_types";

import Chart from "../../components/Chart";
import { DefaultCard, NoData } from "../../components/Default";

import { PhCard, Status, Actions } from "../../components/Dashboard";

import TuboEnsaioSVG from "./../../assets/img/tuboEnsaio.svg";
import ThoughtSVG from "./../../assets/img/thought.svg";
import ArrowSVG from "./../../assets/img/arrow.svg";
import GoutSVG from "./../../assets/img/gout.svg";
import ThermometerSVG from "./../../assets/img/thermometer.svg";
import SoilSVG from "./../../assets/img/soil.svg";
import SunSVG from "./../../assets/img/sun.svg";
const Dashboard = () => {
    const { setLoading } = useLoading();

    const [info, setInfo] = useState<TelemetryProps>();

    const [HumidChart, setHumidChart] = useState<influxProps[]>([]);
    const [TempChart, setTempChart] = useState<influxProps[]>([]);
    const [SoilChart, setSoilChart] = useState<influxProps[]>([]);
    const [LuxChart, setLuxChart] = useState<influxProps[]>([]);

    const onChange = useCallback(async (type: "led"|"bomba1"|"bomba2", value: boolean) => {
        if(!info) return;
        setLoading(true);
        const { FL_STATUS } = await api("nutritec_aut", {[type]: value});
        if(FL_STATUS){
            const temp_ = {...info, [type]: value};
            setInfo(temp_);
        }
        setLoading(false);
    }, [info]);
    const getDescriptionPH = (ph: number) => {
        if(ph < 7){ return "Ácida"; }
        if(ph > 7){ return "Alcalina" }
        
        return "Neutra";
    }
    const handleInit = async () => {
        setLoading(true);

        const { FL_STATUS, requestError, data } = await api("read1", undefined, "GET");
        if(FL_STATUS && !requestError){
            setInfo(data)
        }else if(!FL_STATUS && requestError){
            toast.warn("Verifique sua conexão com a internet e tente novamente dentro de alguns segundos!");
        };

        InfluxDB("SELECT * FROM humid ORDER BY time desc LIMIT 30;").then(result => setHumidChart(result.reverse()));
        InfluxDB("SELECT * FROM temp ORDER BY time desc LIMIT 30;").then(result => setTempChart(result.reverse()));
        InfluxDB("SELECT * FROM soil ORDER BY time desc LIMIT 30;").then(result => setSoilChart(result.reverse()));
        InfluxDB("SELECT * FROM lux ORDER BY time desc LIMIT 30;").then(result => setLuxChart(result.reverse()));
        
        setLoading(false);
    }
    useEffect(() => {
        handleInit();

        const influxRequest = setInterval(() => handleInit(), 10 * 1000);
        return () => clearInterval(influxRequest);
    }, []);
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <DefaultCard
                        title="PH"
                        avatar={<img src={TuboEnsaioSVG} alt="Tubo de ensaio" />}
                        action={
                            <Tooltip title="O pH é representado numa escala que varia de 0 a 14. Sendo assim, o pH 7 representa uma solução neutra (por exemplo, a água pura). Já os que estão antes dele são consideradas soluções ácidas, e os que estão após o 7 são as soluções alcalinas.">
                                <InfoOutlined />
                            </Tooltip>
                        }
                        content={{
                            className: "px-0"
                        }}
                    >
                        <PhCard ph={info?.ph || 0} description={getDescriptionPH(info?.ph || 0)} />
                    </DefaultCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <DefaultCard
                        title="Status"
                        avatar={<img src={ThoughtSVG} alt="Balão de pensamento" />}
                        action={
                            <Tooltip title={`Coleta dos últimos valores de temperatura e humidade do sensor: ${info?.sensorname}`}>
                                <InfoOutlined />
                            </Tooltip>
                        }
                        content={{className: "pb-0"}}
                    >
                        <Status temp={info?.temp} humid={info?.humid} />
                    </DefaultCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <DefaultCard
                        title="Ações"
                        avatar={<img src={ArrowSVG} alt="Seta" />}
                        action={
                            <Tooltip title="Acenda as luzes da prateleira ou ligue a bomba d'água!">
                                <InfoOutlined />
                            </Tooltip>
                        }
                    >
                        <Actions
                            led={info?.led}
                            bomba1={info?.bomba1}
                            bomba2={info?.bomba2}
                            onChange={onChange}
                        />
                    </DefaultCard>
                </Grid> 

                <Grid item xs={12} md={6}>
                    <DefaultCard
                        title="Umidade"
                        avatar={<img src={GoutSVG} height={32} alt="Gota" />}
                    >
                        {HumidChart.length > 0 ? (
                            <Chart
                                data={HumidChart}
                                legend={[{ "key": "humid", "color": "#22E4FF", "alias": "Umidade" }]}
                                item={{ "key": "value", "alias": "Umidade" }}
                                key2XAxis="time"
                                height={250}
                            />
                        ) : <NoData />}
                    </DefaultCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <DefaultCard
                        title="Temperatura"
                        avatar={<img src={ThermometerSVG} height={32} alt="Termometro" />}
                    >
                        {TempChart.length > 0 ? (
                            <Chart
                                data={TempChart}
                                legend={[{ "key": "temp", "color": "#DA1A6B", "alias": "Temperatura" }]}
                                item={{ "key": "value", "alias": "Temperatura" }}
                                key2XAxis="time"
                                height={250}
                            />
                        ) : <NoData />}
                    </DefaultCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <DefaultCard
                        title="Umidade relativa do solo"
                        avatar={<img src={SoilSVG} height={32} alt="Planta na terra" />}
                    >
                        {SoilChart.length > 0 ? (
                            <Chart
                                data={SoilChart}
                                legend={[{ "key": "soil", "color": "#806043", "alias": "Umidade do solo" }]}
                                item={{ "key": "value", "alias": "Umidade do solo" }}
                                key2XAxis="time"
                                height={250}
                            />
                        ) : <NoData />}
                    </DefaultCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <DefaultCard
                        title="Luminiosidade"
                        avatar={<img src={SunSVG} height={32} alt="Sol" />}
                    >
                        {LuxChart.length > 0 ? (
                            <Chart
                                data={LuxChart}
                                legend={[{ "key": "lux", "color": "#FFCE5D", "alias": "Luminosidade" }]}
                                item={{ "key": "value", "alias": "Luminosidade" }}
                                key2XAxis="time"
                                height={250}
                            />
                        ) : <NoData />}
                    </DefaultCard>
                </Grid>
            </Grid>
        </Container>
    );
}
export default Dashboard;