import Theme from "./theme";

import { LoadingProvider } from "./Context/LoadingContext";
import Loading from "./components/Loading";

import Dashboard from "./pages/Dashboard";
import Adm from "./pages";
const App = () => {
	return (
		<LoadingProvider>
			<Loading />
			<Theme>
				<Adm>
					<Dashboard />
				</Adm>
			</Theme>
		</LoadingProvider>
	);
}

export default App;