import { useLoading } from "./../../Context/LoadingContext";
import "./styles.scss";

export default function Loading(){
    const { loading, message } = useLoading();
    
    return loading ? (
        <div id="loading-container">
            <div className="loader"></div>
            {message && <h2 className="message">{message}</h2>}
        </div>
    ) : null;
}