import {
    styled,
    Box,
    Typography,
    LinearProgress,
    linearProgressClasses,
    LinearProgressProps,
    Tooltip
} from '@mui/material';
import { LinearProgressWithLabelProps } from "./../../../_types";
import thermometerSVG from "./../../../assets/img/thermometer.svg";
import goutSVG from "./../../../assets/img/gout.svg";

const BorderLinearProgress = styled(LinearProgress)(({ barcolor }: {barcolor: string}) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "#FFF",
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: barcolor,
    },
}));
function LinearProgressWithLabel(props: LinearProgressProps & LinearProgressWithLabelProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Box sx={{ minWidth: 35, display: 'flex' }}>
                <Tooltip title={props.title}>
                    <>{props.icon}</>
                </Tooltip>
            </Box>
            <Box sx={{ width: '100%', mr: 1 }}>
                <BorderLinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}${props.unitmeasurement}`}</Typography>
            </Box>
        </Box>
    );
}
const Status = ({ temp, humid }: {
    temp?: number
    humid?: number
}) => {
    const normalise = (value: number, MIN: number, MAX: number) => ((value - MIN) * 100) / (MAX - MIN);
    return (
        <div>
            <LinearProgressWithLabel
                title="Temperatura"
                icon={<img src={thermometerSVG} height={32} className="mx-auto" alt="" />} 
                variant="determinate"
                value={normalise(temp || 0, 0, 100)}
                unitmeasurement="º"
                barcolor="#DA1A6B"
            />

            <LinearProgressWithLabel
                title="Humidade"
                icon={<img src={goutSVG} height={32} className="mx-auto" alt="" />} 
                variant="determinate"
                value={normalise(humid || 0, 0, 100)}
                unitmeasurement="%"
                barcolor="#1A89DA"
            />
        </div>
    );
}
export default Status;