import {
	CounterContainer,
	LoginContainer,
	RegisterContainer,
	UserContainer,
	GalleryContainer,
	CustomerContainer,
	EventContainer
} from "../container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { HeaderContainer } from "../container";
import { rootReducer } from "../store/reducers";
import { ToastContainer } from "react-toastify";
import { Footer } from "./Footer";
import "react-toastify/dist/ReactToastify.css";

import "semantic-ui-css/semantic.min.css";
import React, { lazy, Suspense, useEffect } from "react";
import { Provider } from "react-redux";

const composeEnhancer = composeWithDevTools({});
const reduxStore: any = createStore(rootReducer, {}, composeEnhancer(applyMiddleware(thunk as ThunkMiddleware)));
reduxStore.subscribe(() => console.log("redux store", reduxStore.getState()));
//const lazyEventContainer = lazy(() => import("../container/Event.Container"));

const App: React.FC = () => {
	return (
		<Provider store={reduxStore}>
			<Router>
				<ToastContainer autoClose={5000} />
				<HeaderContainer />
				<main>
					<Switch>
						<Suspense fallback={<div>Loading...</div>}>
							<Route path="/login" exact strict component={LoginContainer} />
							<Route path="/register" exact strict component={RegisterContainer} />
							<Route path="/" exact component={CounterContainer} />
							<Route path="/" exact strict component={EventContainer} />
							<Route path="/" exact strict component={UserContainer} />
							<Route path="/" exact strict component={GalleryContainer} />
							<Route path="/" exact strict component={CustomerContainer} />
							<Route path="/" exact strict component={Footer} />
						</Suspense>
					</Switch>
				</main>
			</Router>
		</Provider>
	);
};

export default App;
