import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Adm from "./pages";

export default function RoutesComponent(){
    function RequireAuth({ el }: { el: React.ReactNode }){
        // const location = useLocation();
        // const { authenticated, authenticatedLoading } = useContext(AuthContext);
        
        // if(authenticatedLoading) return <></>;
        // if(!authenticated) return <Navigate to="/" state={{ from: location }} replace />;

        return <Adm>{el}</Adm>
    }
    return(
        <Routes>
            <Route path={`/`} element={ <RequireAuth el={ <Dashboard/> } /> } />
            <Route path={`*`} />
        </Routes>
    );
}