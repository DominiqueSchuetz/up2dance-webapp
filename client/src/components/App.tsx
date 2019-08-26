import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { CounterContainer, EventContainer } from "../container";
import { EventReducer } from "../reducers";
import { Header } from "./Header";

const reduxStore = createStore(combineReducers({ EventReducer }), {}, applyMiddleware(thunk as ThunkMiddleware));

reduxStore.subscribe(() => console.log("i'm your redux store", reduxStore.getState()));

const App: React.FC = () => {
	return (
		<Provider store={reduxStore}>
			<Fragment>
				<Header />
				<main>
					<CounterContainer />
					<EventContainer />
				</main>
			</Fragment>
		</Provider>
	);
};

export default App;
