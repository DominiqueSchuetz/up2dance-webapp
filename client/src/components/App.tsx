import { CounterContainer, EventContainer, LoginContainer } from "../container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { eventReducer, authorizedUserReducer } from "../store/reducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { Header } from "../components/Header";
import { Footer } from "./Footer";
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
					<Header />
					{/* <Sidebar.Pushable as={Segment}>
						<SideBar animation="scale down" direction="bottom" visible={visible} />
						<Sidebar.Pusher> */}
					<main>
						<Route path="/login" exact strict component={LoginContainer} />
						<Route path="/" exact component={CounterContainer} />
						<Route path="/" exact strict component={EventContainer} />
						<Route path="/" exact strict component={Footer} />
					</main>
					{/* </Sidebar.Pusher>
					</Sidebar.Pushable> */}
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
