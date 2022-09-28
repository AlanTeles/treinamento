import Theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { LoadingProvider } from "./Context/LoadingContext";
import Loading from "./components/Loading";
import RoutesComponent from "./RoutesComponent";
const App = () => {
	return (
		<BrowserRouter>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				pauseOnHover={false}
				closeOnClick
				draggable
				theme="colored"
			/>
			<LoadingProvider>
				<Loading />
				<Theme>
					<RoutesComponent />
				</Theme>
			</LoadingProvider>
		</BrowserRouter>
	);
}

export default App;