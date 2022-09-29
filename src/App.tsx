import { BrowserRouter } from "react-router-dom";
import Theme from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoadingProvider } from "./Context/LoadingContext";
import Loading from "./components/Loading";

import RoutesComponent from "./RoutesComponent";
const App = () => {
	return (
		<LoadingProvider>
			<ToastContainer
				position="top-right"
				autoClose={8000}
				hideProgressBar={false}
				pauseOnHover={false}
				closeOnClick
				draggable
				theme="colored"
			/>
			<Loading />
			<Theme>
				<BrowserRouter>
					<RoutesComponent />
				</BrowserRouter>
			</Theme>
		</LoadingProvider>
	);
}

export default App;