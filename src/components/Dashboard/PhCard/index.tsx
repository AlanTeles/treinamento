import { Tooltip } from "@mui/material";
import "./style.scss";
export default function PhCard({ ph }: {ph: number}){
    const getLeftDistanceOfScale = (currentScale: number, sizeScale=20, sizeDescription=50): number => {
        // O primeiro cálculo, serve para saber o centro do texto da descrição
        // O segundo cálculo, serve para ter a distância que o objeto tem que assumir para se afastar de sua esquerda
        return ((sizeDescription / 2) * -1) + currentScale * sizeScale;
    }
    const getDescriptionPH = (ph: number) => {
        if(ph < 7){ return "Ácida"; }
        if(ph > 7){ return "Alcalina" }
        
        return "Neutra";
    }
    return(
        <div className="ph-scale">
            <div className="scale">
                {Array.from({length: 14}, (v, k) => k + 1).map(item => (
                    <div key={`ph-scale-${item}`} className={`scale-${item}`}></div>
                ))}
            </div>
            <div className="description-content">
                <Tooltip title={`PH: ${ph > 0 ? ph.toFixed(2) : ph}`} placement="left">
                    <p className="text-align-center" style={{ left: getLeftDistanceOfScale(ph) }}>{getDescriptionPH(ph)} {ph.toFixed(2)}</p>
                </Tooltip>
            </div>
        </div>
    )
}