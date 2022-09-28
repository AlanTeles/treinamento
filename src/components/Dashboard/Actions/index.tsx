import { Grid, Stack, Paper, Tooltip, Switch } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

import { ActionCardProps, ActionProps, ActionItemProps } from "./../../../_types";

import FaucetSVG from "./../../../assets/img/faucet.svg";
import LampSVG from "./../../../assets/img/lamp.svg";


const Actions = ({ led, bomba1, bomba2, onChange }: ActionCardProps) => {
    return (
        <Grid container spacing={2} display="flex" justifyContent="space-between">
            <Grid item xs={12} sm={4}>
                <Action name="1ª bomba" color={bomba1 ? "bg-blue" : undefined}>
                    <ActionItem
                        tooltip="Para irrigar o vaso da esquerda"
                        icon={<img src={FaucetSVG} height={25} className="mt-4" alt="" />}
                        type="bomba1"
                        switchActive={bomba1}
                        onChange={onChange}
                    />
                </Action>
            </Grid>

            <Grid item xs={12} sm={4} className="text-align-center">
                <Action name="LED" color={led ? "bg-yellow" : undefined}>
                    <ActionItem
                        tooltip="Controle do LED superior"
                        icon={<img src={LampSVG} height={25} className="mt-4" alt="" />}
                        type="led"
                        switchActive={led}
                        onChange={onChange}
                    />
                </Action>
            </Grid>

            <Grid item xs={12} sm={4} className="text-align-center">
                <Action name="2ª bomba" color={bomba1 ? "bg-blue" : undefined}>
                    <ActionItem
                        tooltip="Para irrigar o vaso da direita"
                        icon={<img src={FaucetSVG} height={25} className="mt-4" alt="" />}
                        type="bomba2"
                        switchActive={bomba2}
                        onChange={onChange}
                    />
                </Action>
            </Grid>
        </Grid>
    );
}
const Action = ({ children, name, color }: ActionProps) => {
    return(
        <div className="text-align-center">
            <Paper elevation={3} className={`action-paper p-2 mb-2 ${color || "bg-dark-1"}`}>
                {children}
            </Paper>
            <p>{name}</p>
        </div>
    );
}
const ActionItem = ({ tooltip, type, icon, switchActive, onChange }: ActionItemProps) => {
    return(
        <Stack position="relative" direction="column" alignItems="center">
            <Tooltip
                title={tooltip}
                sx={{
                    position: "absolute",
                    right: 0, 
                    top: 0
                }}
            >
                <InfoOutlined fontSize="small" />
            </Tooltip>
            {icon}
            <Switch
                size="small"
                defaultChecked={switchActive}
                onChange={ev => onChange(type, ev.target.checked)}
                color="info"
            />
        </Stack>
    );
}
export default Actions;