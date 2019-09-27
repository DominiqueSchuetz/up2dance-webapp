import { CounterContainer, EventContainer, LoginContainer } from "../container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { eventReducer, authorizedUserReducer } from "../store/reducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { Header } from "../components/Header";
import { Footer } from "./Footer";
import { Button, Sidebar, Segment, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import React, { Fragment, useState } from "react";
import { Provider } from "react-redux";
import { SideBar } from "./SideBar";

const composeEnhancer = composeWithDevTools({});
const reduxStore = createStore(
	combineReducers({ eventReducer, authorizedUserReducer }),
	{},
	composeEnhancer(applyMiddleware(thunk as ThunkMiddleware))
);
reduxStore.subscribe(() => console.log("redux store", reduxStore.getState()));

const App: React.FC = () => {
	const [ visible, setVisibility ] = useState(false);
	const handleOnClick = () => {
		setVisibility(!visible);
	};
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
