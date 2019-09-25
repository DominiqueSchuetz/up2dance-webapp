import { CounterContainer, EventContainer, LoginContainer } from "../container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { eventReducer, authorizedUserReducer } from "../store/reducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { Header } from "../components/Header";
import "semantic-ui-css/semantic.min.css";
import React, { Fragment } from "react";
import { Provider } from "react-redux";

const composeEnhancer = composeWithDevTools({});
const reduxStore = createStore(
	combineReducers({ eventReducer, authorizedUserReducer }),
	{},
	composeEnhancer(applyMiddleware(thunk as ThunkMiddleware))
);
reduxStore.subscribe(() => console.log("redux store", reduxStore.getState()));

const App: React.FC = () => {
	return (
		<Provider store={reduxStore}>
			<Router>
				<Fragment>
					<div>
						<Header />
						<main>
							<Route path="/login" exact strict component={LoginContainer} />
							<Route path="/" exact component={CounterContainer} />
							<Route path="/" exact strict component={EventContainer} />
						</main>
					</div>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
