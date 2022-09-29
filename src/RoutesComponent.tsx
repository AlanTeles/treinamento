import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Adm from "./pages";

function RequireAuth({ el }: { el: React.ReactNode }){
    return <Adm>{el}</Adm>
}
const RoutesComponent = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<RequireAuth el={<Dashboard />} />} />
        </Routes>
    );
}
export default RoutesComponent;