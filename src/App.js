import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import Routes from "./routes";
import configureStore from "./store";
import history from "./utils/history";

import "./App.css";
import "antd/dist/antd.css";

const initialState = {};
const store = configureStore(initialState, history);

const getLibrary = provider => {
	const library = new Web3Provider(provider);
	library.pollingInterval = 12000;
	return library;
}

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Web3ReactProvider getLibrary={getLibrary}> 
					<Routes />
				</Web3ReactProvider>
			</Router>
		</Provider>
	);
};

export default App;
